/**
 * Tiny fuzzy matcher for the command palette (Stage 8).
 *
 * `fuzzyMatch(needle, haystack)` returns null when the needle's characters
 * don't appear in order in the haystack, otherwise a numeric `score` (higher
 * is better) and the `ranges` of matched character indices in the haystack —
 * suitable for inline <mark> highlighting.
 *
 * Bonuses are tuned for short, label-style strings (≤80 chars):
 *   - first-character match
 *   - match at word/non-word boundary
 *   - consecutive matches (runs)
 *
 * Penalty: extra unmatched chars at the tail dilute the score, so shorter
 * labels rank higher when both match equally well.
 */

export type FuzzyHit = { score: number; ranges: [number, number][] };

export function fuzzyMatch(needle: string, haystack: string): FuzzyHit | null {
	if (!needle) return { score: 0, ranges: [] };
	const n = needle.toLowerCase();
	const h = haystack.toLowerCase();

	let nIdx = 0;
	let score = 0;
	let runStart = -1;
	let prevMatched = false;
	const ranges: [number, number][] = [];

	for (let i = 0; i < h.length && nIdx < n.length; i++) {
		if (h[i] === n[nIdx]) {
			if (i === 0) score += 12;
			if (i > 0 && /[\s\-_./:]/.test(h[i - 1])) score += 8;
			if (prevMatched) score += 5;
			else if (runStart >= 0) {
				ranges.push([runStart, i - 1]);
				runStart = -1;
			}
			if (runStart < 0) runStart = i;
			score += 2;
			nIdx++;
			prevMatched = true;
		} else {
			if (prevMatched && runStart >= 0) {
				ranges.push([runStart, i - 1]);
				runStart = -1;
			}
			prevMatched = false;
		}
	}

	if (nIdx < n.length) return null;
	if (runStart >= 0) {
		// Close the trailing run at the last matched character (i.e. the one that completed the needle).
		// We can't know its exact index without tracking, but the run continues to where nIdx topped out;
		// we approximate by extending to wherever the last bonus fired.
		let last = runStart;
		for (let i = runStart; i < h.length && last - runStart < n.length; i++) {
			if (h[i] === n[Math.min(last - runStart, n.length - 1)]) last = i;
		}
		ranges.push([runStart, last]);
	}

	score -= Math.max(0, h.length - n.length) * 0.05;
	return { score, ranges };
}

/** Highlight helper: split a string into `{ text, hit }` segments based on ranges. */
export function splitByRanges(
	text: string,
	ranges: [number, number][]
): Array<{ text: string; hit: boolean }> {
	if (!ranges.length) return [{ text, hit: false }];
	const sorted = [...ranges].sort((a, b) => a[0] - b[0]);
	const segs: Array<{ text: string; hit: boolean }> = [];
	let cursor = 0;
	for (const [start, end] of sorted) {
		if (start > cursor) segs.push({ text: text.slice(cursor, start), hit: false });
		segs.push({ text: text.slice(start, end + 1), hit: true });
		cursor = end + 1;
	}
	if (cursor < text.length) segs.push({ text: text.slice(cursor), hit: false });
	return segs;
}

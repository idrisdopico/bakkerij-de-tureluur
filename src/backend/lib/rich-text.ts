import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';

/**
 * Builds the minimal Lexical document shape a `richText` field expects, from
 * plain paragraph strings. Only `seed.ts` needs this today (turning the
 * site's existing hard-coded copy into real rich-text documents on first
 * seed), but it's kept as its own function rather than inlined there, since
 * "plain strings in, a valid Lexical document out" is a generically useful
 * building block for anything that seeds or migrates rich text later.
 *
 * Generic over the return type so callers can ask for the exact field type
 * Payload generates for a given `richText` field (e.g. `About['paragraphs']`).
 * Those generated types carry `[k: string]: unknown` index signatures that a
 * plain `SerializedEditorState` isn't assignable to, so the value is built as
 * a valid Lexical document and returned as the requested field type.
 */
export function richTextFromParagraphs<T = SerializedEditorState>(
  paragraphs: string[],
): T {
  return {
    root: {
      type: 'root',
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
      children: paragraphs.map(text => ({
        type: 'paragraph',
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
        children: [
          {
            type: 'text',
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text,
            version: 1,
          },
        ],
      })),
    },
  } as T;
}

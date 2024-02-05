"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./toolbar";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";

export default function Tiptap({
  description,
  onChange,
  title,
}: {
  description: string;
  onChange: (richText: string) => void;
  title: string;
}) {
  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
        Heading.configure({
          HTMLAttributes: {
            class: "text-2xl",
          },
        }),
      ],
      content: description,
      editorProps: {
        attributes: {
          class: "rounded-md p-3 min-h-[250px] border",
        },
      },

      onUpdate({ editor }) {
        onChange(editor.getHTML());
      },
    },

    [title]
  );

  return (
    <>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
}

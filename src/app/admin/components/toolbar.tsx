"use client";
import { type Editor } from "@tiptap/react";
import {
  BsJustify,
  BsJustifyLeft,
  BsJustifyRight,
  BsListTask,
  BsTextCenter,
  BsTypeBold,
  BsTypeH2,
  BsTypeItalic,
} from "react-icons/bs";

interface Props {
  editor: Editor | null;
}

export default function Toolbar({ editor }: Props) {
  if (!editor) {
    return null;
  }
  return (
    <div className="border border-1 bg-transparent rounded-md p-2 mb-3">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className="btn btn-sm btn-ghost"
      >
        <BsTypeBold />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className="btn btn-sm btn-ghost"
      >
        <BsTypeH2 />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className="btn btn-sm btn-ghost"
      >
        <BsJustifyLeft />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className="btn btn-sm btn-ghost"
      >
        <BsJustifyRight />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className="btn btn-sm btn-ghost"
      >
        <BsTextCenter />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className="btn btn-sm btn-ghost"
      >
        <BsJustify />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className="btn btn-sm btn-ghost"
      >
        <BsTypeItalic />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className="btn btn-sm btn-ghost"
      >
        <BsListTask />
      </button>
    </div>
  );
}

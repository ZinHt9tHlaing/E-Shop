import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "../ui/button";
import { Bold, Italic, List, ListOrdered } from "lucide-react";

interface TipTapProps {
  value: string;
  onChange: (value: string) => void;
}

const Tiptap = ({ value, onChange }: TipTapProps) => {
  const editor = useEditor({
    extensions: [StarterKit], // define your extension array
    content: value, // initial content
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) return null;

  return (
    <div className="border rounded-lg p-2">
      <div className="flex items-center gap-2 mb-4">
        {/* Bold */}
        <Button
          type="button"
          size={"sm"}
          variant={editor.isActive("bold") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="cursor-pointer active:ring-1 active:ring-gray-500 duration-150"
        >
          <Bold className="size-4" />
        </Button>

        {/* Italic */}
        <Button
          type="button"
          size={"sm"}
          variant={editor.isActive("italic") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="cursor-pointer active:ring-1 active:ring-gray-500 duration-150"
        >
          <Italic className="size-4" />
        </Button>

        {/* Bullet List */}
        <Button
          type="button"
          size={"sm"}
          variant={editor.isActive("bulletList") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="cursor-pointer active:ring-1 active:ring-gray-500 duration-150"
        >
          <List className="h-4 w-4" />
        </Button>

        {/* Ordered List */}
        <Button
          type="button"
          size={"sm"}
          variant={editor.isActive("orderedList") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className="cursor-pointer active:ring-1 active:ring-gray-500 duration-150"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
      </div>
      <EditorContent editor={editor} className="prose" />
    </div>
  );
};

export default Tiptap;

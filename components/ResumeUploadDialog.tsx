"use client";

import { useRef, useState, DragEvent } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText, X } from "lucide-react";

type Props = {
  trigger: React.ReactNode;
};

export default function ResumeUploadDialog({ trigger }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [role, setRole] = useState("");

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) setFile(f);
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const onDragLeave = () => setDragging(false);

  const onBrowseClick = () => fileInputRef.current?.click();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
  };

  const reset = () => {
    setFile(null);
    setRole("");
  };

  const onContinue = () => {
    console.log("Selected file:", file);
    console.log("Target role:", role);
  };

  const fileInfo = file
    ? `${file.name} • ${(file.size / 1024 / 1024).toFixed(2)} MB`
    : "No file selected";

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-lg font-sans bg-black/50 backdrop-blur-xl border border-zinc-700/50 text-zinc-100 shadow-xl">
      <DialogHeader>
      <DialogTitle>Upload your resume</DialogTitle>
      <DialogDescription>
      Supported formats: PDF, DOC, DOCX (max ~10MB). We’ll parse it and tailor
      suggestions for your target role.
      </DialogDescription>
      </DialogHeader>

        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          className={`mt-3 flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition-colors
            ${dragging ? "border-emerald-500 bg-emerald-500/10" : "border-zinc-700/60 hover:border-zinc-600"}
          `}
          onClick={onBrowseClick}
          role="button"
          tabIndex={0}
        >
          <Upload className="h-6 w-6 mb-2 opacity-90" />
          <p className="text-sm text-zinc-300">
            Drag & drop your resume here, or <span className="underline">browse</span>
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={onFileChange}
            className="hidden"
          />
        </div>

        <div className="mt-3 flex items-center justify-between rounded-lg border border-zinc-700/60 px-3 py-2">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="text-sm text-zinc-200">{fileInfo}</span>
          </div>
          {file && (
            <button
              type="button"
              className="rounded-md p-1 hover:bg-zinc-800"
              onClick={() => setFile(null)}
              aria-label="Remove file"
              title="Remove file"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="mt-4 grid gap-2">
          <Label htmlFor="role">Target role (optional)</Label>
          <Input
            id="role"
            placeholder="e.g., Data Analyst, Frontend Engineer"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>

        <DialogFooter className="mt-5">
          <DialogClose asChild>
            <Button variant="outline" onClick={reset}>Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              className="bg-emerald-600 hover:bg-emerald-500"
              onClick={onContinue}
              disabled={!file}
            >
              Continue
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

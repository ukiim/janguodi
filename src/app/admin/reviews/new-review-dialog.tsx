"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { createReview } from "./actions";

export function NewReviewDialog({
  programs,
}: {
  programs: { slug: string; title: string }[];
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();
  const [programSlug, setProgramSlug] = useState(programs[0]?.slug ?? "");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [isPublished, setIsPublished] = useState(true);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    start(async () => {
      try {
        await createReview({ programSlug, name, content, rating, isPublished });
        toast.success("후기가 추가되었습니다.");
        setOpen(false);
        setName("");
        setContent("");
        router.refresh();
      } catch (err) {
        toast.error("추가 중 오류");
        console.error(err);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button>
            <Plus className="h-4 w-4 mr-1" />새 후기
          </Button>
        }
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 후기 추가</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <Label>프로그램</Label>
            <Select value={programSlug} onValueChange={(v) => setProgramSlug(v ?? "")}>
              <SelectTrigger>
                <SelectValue placeholder="프로그램 선택" />
              </SelectTrigger>
              <SelectContent>
                {programs.map((p) => (
                  <SelectItem key={p.slug} value={p.slug}>
                    {p.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>작성자</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>내용</Label>
            <Textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>평점 (1~5)</Label>
              <Input
                type="number"
                min={1}
                max={5}
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label>게시</Label>
              <label className="flex items-center gap-2 h-9">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                />
                <span className="text-sm">즉시 게시</span>
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={pending}>
              {pending ? "추가 중…" : "추가"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

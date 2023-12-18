import Button from "@/components/ui/Button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button size="sm" className="text-sm" isLoading>
        Hello
      </Button>
    </main>
  );
}

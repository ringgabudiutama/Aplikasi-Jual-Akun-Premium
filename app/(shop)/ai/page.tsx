import { TopBar } from "@/components/TopBar";
import { ChatWidget } from "@/components/ChatWidget";
import { getBrands, getAiKnowledge } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AiPage() {
  const [brands, knowledge] = await Promise.all([
    getBrands({ activeOnly: true }),
    getAiKnowledge(),
  ]);

  return (
    <div>
      <TopBar title="AI Assistant" compact />
      <ChatWidget brands={brands} knowledge={knowledge} />
    </div>
  );
}

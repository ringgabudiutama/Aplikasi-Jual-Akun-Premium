import { TopBar } from "@/components/TopBar";
import { ChatWidget } from "@/components/ChatWidget";
import { getBrands, getAiKnowledge, getSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AiPage() {
  const [brands, knowledge, settings] = await Promise.all([
    getBrands({ activeOnly: true }),
    getAiKnowledge(),
    getSettings(),
  ]);

  return (
    <div>
      <TopBar title="AI Assistant" compact logoUrl={settings.logoUrl} />
      <ChatWidget brands={brands} knowledge={knowledge} />
    </div>
  );
}

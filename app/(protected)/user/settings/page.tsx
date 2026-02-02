import TabsSettingPage from "@/features/_protected/_settingsPage/_components/TabsSettingPage";
import { SettingTabKeyType } from "@/types/UserSettingPage.type";
import { Metadata } from "next";

type UserSettingsPageProps = {
  searchParams: Promise<SettingTabKeyType>;
};
export const metadata: Metadata = {
  title: "User Settings",
};

export default async function UserSettingsPage({
  searchParams,
}: UserSettingsPageProps) {
  const { tab } = await searchParams;
  return (
    <main className="mt-10 w-full">
      <TabsSettingPage tab={tab} />
    </main>
  );
}

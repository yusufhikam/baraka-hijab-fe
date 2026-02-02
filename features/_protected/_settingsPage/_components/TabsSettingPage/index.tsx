"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabsContentAccount from "@/features/_protected/_settingsPage/_components/TabsSettingPage/TabsContents/TabsContentAccount";
import TabsContentAddress from "@/features/_protected/_settingsPage/_components/TabsSettingPage/TabsContents/TabsContentAddress";
import { SettingTabKeyType } from "@/types/UserSettingPage.type";
import { CircleUser, Map } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const TabsSettingPage: React.FC<SettingTabKeyType> = ({ tab = "account" }) => {
  const router = useRouter();
  const getSearchParams = useSearchParams();

  const onChangeTabs = (value: string) => {
    const newParams = new URLSearchParams(getSearchParams.toString());
    newParams.set("tab", value);
    router.replace(`?${newParams.toString()}`, { scroll: false });
  };

  return (
    <Tabs
      defaultValue={tab}
      onValueChange={onChangeTabs}
      className="w-full flex-col gap-5 lg:flex-row"
    >
      <TabsList className="bg-baraka-primary-400 mx-auto h-full gap-2 lg:mx-0 lg:flex-col">
        {SETTINGS_TAB.map((tab, idx) => (
          <TabsTrigger key={idx} value={tab.value}>
            <tab.icon />
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContentAccount />

      <TabsContentAddress />
    </Tabs>
  );
};

export default TabsSettingPage;

const SETTINGS_TAB = [
  {
    value: "account",
    label: "Account",
    icon: CircleUser,
  },
  {
    value: "address",
    label: "Address",
    icon: Map,
  },
];

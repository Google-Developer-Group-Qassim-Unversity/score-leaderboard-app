import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserProfile } from "@clerk/nextjs";
import { ProfileForm } from "@/components/profile-form";
import { EventsFeed } from "@/components/profile/events-feed";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getLanguageFromCookies,
  getTranslation,
  isRTL,
} from "@/lib/server-i18n";
import { User } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  const lang = await getLanguageFromCookies();
  const rtl = isRTL(lang);
  const t = (key: string) => getTranslation(lang, key);

  return (
    <div
      className="container mx-auto px-4 py-8 max-w-7xl"
      dir={rtl ? "rtl" : "ltr"}
    >
      <h1 className="lg:hidden text-2xl font-semibold text-center mb-8">
        {t("profile.pageTitle")}
      </h1>

      <div className="lg:hidden mb-8">
        <EventsFeed />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 lg:gap-6">
        <Card className="py-4 gap-3">
          <CardHeader className="px-5 pb-0">
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="h-4.5 w-4.5" />
              {t("profile.gdgProfile")}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-2 [&_form]:p-0 [&_form]:max-w-none [&_form]:space-y-3">
            <ProfileForm />
          </CardContent>
        </Card>

        <Card className="p-0 gap-0 overflow-hidden [&_.cl-rootBox]:w-full [&_.cl-cardBox]:w-full [&_.cl-cardBox]:shadow-none [&_.cl-cardBox]:border-none [&_.cl-cardBox]:rounded-none">
          <UserProfile routing="virtual" />
        </Card>
      </div>

      <div className="hidden lg:block mt-6">
        <EventsFeed />
      </div>
    </div>
  );
}

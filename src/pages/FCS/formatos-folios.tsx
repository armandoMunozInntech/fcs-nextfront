"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import DashboardLayout from "@/component/layout/dashboardLayout";
import { NextPageWithLayout } from "@/pages/_app";
import Loader from "@/component/common/loader";
import FCSCont from "@/container/FCS/FCSCont";
import TabsLayout from "@/component/FCS/LayoutFCS";

const FormatoFolio: NextPageWithLayout = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "loading") {
    return <Loader />;
  }

  // Si no hay sesión, redirige al usuario al inicio de sesión
  if (!session) {
    if (typeof window !== "undefined") {
      router.push("/login");
    }
    return null;
  }

  // Si hay sesión, muestra la página del dashboard
  return <FCSCont />;
};

FormatoFolio.getLayout = function getLayout(page: ReactElement) {
  return (
    <DashboardLayout>
      <TabsLayout>{page}</TabsLayout>
    </DashboardLayout>
  );
};

export default FormatoFolio;

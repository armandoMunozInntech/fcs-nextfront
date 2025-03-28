"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import DashboardLayout from "@/component/layout/dashboardLayout";
import { NextPageWithLayout } from "@/pages/_app";
import Loader from "@/component/common/loader";
import TicketsCont from "@/container/ticketsCont";

const Tickets: NextPageWithLayout = () => {
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
  return <TicketsCont />;
};

Tickets.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Tickets;

import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ConsultationModal from "./ConsultationModal";
import useSmoothScroll from "../../hooks/useSmoothScroll";

export default function MainLayout({
  children,
  onOpenConsultation,
  isConsultationOpen,
  onCloseConsultation
}) {
  useSmoothScroll();

  return (
    <div className="min-h-screen flex flex-col bg-black text-white selection:bg-brand-gold selection:text-black">
      <Navbar onOpenConsultation={onOpenConsultation} />
      <main className="flex-grow pt-20">{children}</main>
      <Footer onOpenConsultation={onOpenConsultation} />
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={onCloseConsultation}
      />
    </div>
  );
}

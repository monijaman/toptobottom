import { Container, Content, PageContainer } from "components/ui/DashboardLayout/DashboardLayout.styles";
import Footer from "components/ui/Footer";
import Header from "components/ui/Header";
import Sidebar from "components/ui/Sidebar";
import { useState } from "react";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isOpened, setOpened] = useState(false);
  const toggleDrawer = () => {
    setOpened((prev) => !prev);
  };

  return (
    <Container>
      <Header isOpened={isOpened} toggleDrawer={toggleDrawer} />
      <Content>
        <Sidebar isOpened={isOpened} />
        <PageContainer>{children}</PageContainer>
      </Content>
      <Footer />
    </Container>
  );
}

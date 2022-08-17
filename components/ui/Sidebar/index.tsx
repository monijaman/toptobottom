import MenuItemsList from "components/ui/MenuItemsList";
import { SidebarContainer } from "components/ui/Sidebar/Sidebar.styles";
import { MENU_ITEMS } from "constants/menu-items";

type SidebarProps = {
  isOpened: boolean;
};
export default function Sidebar({ isOpened }: SidebarProps) {
  return (
    <SidebarContainer isOpened={isOpened}>
      <MenuItemsList options={MENU_ITEMS} />
    </SidebarContainer>
  );
}

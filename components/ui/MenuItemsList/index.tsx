import MenuItem from "components/ui/MenuItem";
import { ListContainer } from "components/ui/MenuItemsList/MenuItemsList.styles";
import { MenuItem as MenuItemType } from "constants/menu-items";

type MenuItemsListProps = {
  options: MenuItemType[];
};

export default function MenuItemsList({ options }: MenuItemsListProps) {
  return (
    <ListContainer>
      {options.map((option) => (
        <MenuItem menuItem={option} key={option.id} />
      ))}
    </ListContainer>
  );
}

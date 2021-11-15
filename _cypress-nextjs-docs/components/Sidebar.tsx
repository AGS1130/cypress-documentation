import Link from "next/link"
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar"
import "react-pro-sidebar/dist/css/styles.css"

export default function Sidebar({ page, sidebarContent }) {
  return (
    <>
      {sidebarContent.children.map((item, index) => (
        <ProSidebar key={index}>
          <Menu iconShape="square">
            <SubMenu title={item.title} key={index}>
              {item.children.map((subItem, subIndex) => (
                <MenuItem key={subIndex}>
                  <Link href={`/${page}/${item.slug}/${subItem.slug}`}>
                    <a>{subItem.title}</a>
                  </Link>
                </MenuItem>
              ))}
            </SubMenu>
          </Menu>
        </ProSidebar>
      ))}
    </>
  )
}

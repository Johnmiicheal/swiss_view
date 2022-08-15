import { Box, CloseButton, Flex, Text, Image } from "@chakra-ui/react";

import {
  FiHome,
  FiSettings,
} from "react-icons/fi";
import { IoBarChartOutline } from "react-icons/io5"

import NavLink from "./NavLink";

const LinkItems = [
  { label: "Dashboard", icon: FiHome, href: "/" },
  { label: "Graphs", icon: IoBarChartOutline, href: "/graphs" },
  // { label: "Settings", icon: FiSettings, href: "/settings" },
];

export default function Sidebar({ onClose, page, setPage,  ...rest }) {

  return (
    <Box
      transition="3s ease"
      bg="white"
      borderRight="1px"
      borderRightColor="gray.200"
      w={{ base: "full", lg: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center"  justifyContent="space-between" bg="#000A16">
        <Flex mx={3} align='center'>
        <Image src="/swislogo.png" alt="swis_logo" w={40}/>
        </Flex>
        <CloseButton display={{ base: "flex", lg: "none" }} onClick={onClose} color='white' />
      </Flex>
      {LinkItems.map((link, i) => (
       <a key={i} onClick={ () => setPage(link.href)}>
          <NavLink link={link} page={page} />
       </a> 
      ))}
    </Box>
  );
}
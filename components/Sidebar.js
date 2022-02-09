import React from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FiHome, FiCompass, FiMenu } from "react-icons/fi";
import { GiMachineGunMagazine, GiBeamsAura } from "react-icons/gi";
import { FaDiscord } from "react-icons/fa";

const LinkItems = [
  { name: "Ammo Charts", icon: FiHome, path: "/nofoodaftermidnight" },
  { name: "Gun Builder", icon: GiMachineGunMagazine, path: "/gun-builder" },
  { name: "Explore Gun Builds", icon: FiCompass, path: "/explorer" },
  { name: "Loadout Builder", icon: GiBeamsAura, path: "/builder" },
  {
    name: "Join my Discord",
    icon: FaDiscord,
    path: "https://discord.gg/H4v5sQR7We",
  },
];

export default function Sidebar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg="vulcan.900" color="tarkovYellow.100">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", xl: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", xl: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, xl: 60 }}>{children}</Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      bg="vulcan.900"
      color="tarkovYellow.100"
      //   borderRight="1px"
      //   borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", xl: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="4xl" fontFamily="monospace" fontWeight="bold">
          EFT-AMMO
        </Text>
        <CloseButton display={{ base: "flex", xl: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} href={link.path}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, href, children, ...rest }) => {
  return (
    <Link
      href={href}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        role="group"
        cursor="pointer"
        color="tarkovYellow.100"
        fontWeight="bold"
        _hover={{
          bg: "tarkovYellow.50",
          color: "black",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "black",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, xl: 60 }}
      px={{ base: 4, xl: 24 }}
      height="20"
      alignItems="center"
      bg="vulcan.900"
      //   borderBottomWidth="1px"
      //   borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        fontSize="2xl"
        ml="8"
        fontFamily="monospace"
        fontWeight="bold"
        color="tarkovYellow.100"
      >
        EFT-AMMO
      </Text>
    </Flex>
  );
};

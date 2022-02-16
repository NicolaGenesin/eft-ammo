import React, { useState, useEffect } from "react";
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
  Tag,
} from "@chakra-ui/react";
import { FiCompass, FiMenu } from "react-icons/fi";
import {
  GiAk47U,
  GiBeamsAura,
  GiShotgunRounds,
  GiDuration,
  GiDrippingTube,
} from "react-icons/gi";
import { FaDiscord } from "react-icons/fa";
import { useRouter } from "next/router";

const LinkItems = [
  { name: "Ammo Charts", icon: GiShotgunRounds, path: "/nofoodaftermidnight" },
  {
    name: "Create Gun Build",
    icon: GiAk47U,
    path: "/gun-builder",
    isNew: true,
  },
  {
    name: "Explore Gun Builds",
    icon: FiCompass,
    path: "/gun-builder/explorer",
  },
  { name: "[Beta] Create Loadout", icon: GiBeamsAura, path: "/builder" },
  {
    name: "Traders Reset Timers",
    icon: GiDuration,
    path: "/traders-reset-timers",
  },
  {
    name: "Join the Discord",
    icon: FaDiscord,
    path: "https://discord.gg/H4v5sQR7We",
    isExternal: true,
  },
  {
    name: "Feedback",
    icon: GiDrippingTube,
    path: "https://forms.gle/ToTmLYiWoxuGsM2R6",
    isExternal: true,
  },
];

export default function Sidebar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState();

  useEffect(() => {
    const index = LinkItems.findIndex((item) =>
      item.path.includes(router.asPath)
    );

    if (index >= 0) {
      setSelectedIndex(index);
    }
  }, [router.asPath]);

  return (
    <Box minH="100vh" color="tarkovYellow.100">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", xl: "block" }}
        selectedIndex={selectedIndex}
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
          <SidebarContent onClose={onClose} selectedIndex={selectedIndex} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", xl: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, xl: 60 }}>{children}</Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, selectedIndex, ...rest }) => {
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
      {LinkItems.map((link, index) => (
        <NavItem
          key={link.name}
          isNew={link.isNew}
          icon={link.icon}
          href={link.path}
          isSelected={selectedIndex === index}
          isExternal={link.isExternal}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({
  icon,
  isNew,
  isSelected,
  isExternal,
  href,
  children,
  ...rest
}) => {
  return (
    <Link
      href={href}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
      isExternal={isExternal}
    >
      <Flex
        align="center"
        px="6"
        py="4"
        role="group"
        cursor="pointer"
        fontWeight="bold"
        bg={isSelected && "tarkovYellow.50"}
        color={isSelected ? "black" : "tarkovYellow.100"}
        _hover={{
          bg: "tarkovYellow.50",
          color: "black",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="22"
            _groupHover={{
              color: "black",
            }}
            as={icon}
          />
        )}
        {children}{" "}
        {isNew && (
          <Tag
            ml="8px"
            size="sm"
            colorScheme="purple"
            borderRadius="full"
            variant="solid"
            fontSize="xs"
            fontWeight="bold"
          >
            NEW
          </Tag>
        )}
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

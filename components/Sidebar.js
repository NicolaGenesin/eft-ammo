import React, { useState, useEffect } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Tag,
  Center,
  VStack,
} from "@chakra-ui/react";
import { FiCompass, FiMenu } from "react-icons/fi";
import {
  GiAk47U,
  GiShotgunRounds,
  GiDrippingTube,
  GiPodiumWinner,
  GiSixEyes,
  GiAlarmClock,
} from "react-icons/gi";
import { FaDiscord } from "react-icons/fa";
import { VscGraphScatter } from "react-icons/vsc";
import { useRouter } from "next/router";

const LinkItems = [
  { name: "Ammo Table", icon: GiShotgunRounds, path: "/nofoodaftermidnight" },
  {
    name: "Ammo Graph",
    icon: VscGraphScatter,
    path: "/ammo-graph",
  },
  {
    name: "Ammo Tier List",
    icon: GiPodiumWinner,
    path: "/rengawr-tierlist",
    isNew: true,
  },
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
  {
    name: "Traders timers",
    icon: GiAlarmClock,
    path: "/traders-reset-timers",
  },
  {
    name: "Join NoFAM Discord",
    icon: FaDiscord,
    path: "https://discord.gg/wexEyCg",
    isExternal: true,
  },
  {
    name: "Join Developer Discord",
    icon: FaDiscord,
    path: "https://discord.com/invite/H4v5sQR7We",
    isExternal: true,
    bgColor: "vulcan.1050",
  },
  {
    name: "Feedback",
    icon: GiDrippingTube,
    path: "https://forms.gle/ToTmLYiWoxuGsM2R6",
    isExternal: true,
    bgColor: "vulcan.1050",
  },
  {
    name: "Multistream.gg",
    icon: GiSixEyes,
    path: "https://multistream.gg",
    isExternal: true,
    isNew: true,
    bgColor: "brown",
  },
];

export default function Sidebar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = useState();
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

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
        hideSidebar={() => {
          setIsSidebarVisible(false);
        }}
        display={isSidebarVisible ? { base: "none", xl: "block" } : "none"}
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
          <SidebarContent
            onClose={onClose}
            selectedIndex={selectedIndex}
            hideSidebar={() => {
              setIsSidebarVisible(false);
            }}
          />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      {isSidebarVisible && (
        <MobileNav
          display={isSidebarVisible ? { base: "flex", xl: "none" } : "flex"}
          onOpen={onOpen}
        />
      )}
      <Box ml={isSidebarVisible ? { base: 0, xl: 60 } : 0}>{children}</Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, hideSidebar, selectedIndex, ...rest }) => {
  return (
    <VStack
      bg="vulcan.900"
      color="tarkovYellow.100"
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
          bgColor={link.bgColor}
          icon={link.icon}
          href={link.path}
          isSelected={selectedIndex === index}
          isExternal={link.isExternal}
        >
          {link.name}
        </NavItem>
      ))}
      <Center>
        <Text
          onClick={() => {
            hideSidebar();
          }}
          textAlign="center"
          fontSize="sm"
          border="1px"
          my="8px"
          px="8px"
          color="tarkovYellow.50"
          display={{ base: "none", xl: "flex" }}
          _hover={{ cursor: "pointer" }}
        >
          Hide Sidebar
        </Text>
      </Center>
      <Text textAlign="center" fontSize="xs" opacity="0.4">
        CHANGELOG:
        <br />
        <br />
        April 14th 2022:
        <br />
        New caliber (.357) added
        <br />
        <br />
        March 11th 2022:
        <br />
        Reviewed ammos available on FM
        <br />
        <br />
        March 7th 2022:
        <br />
        Loadout Builder tool removed
        <br />
        (reviewing alpha feedback)
        <br />
        <br />
        February 28th 2022:
        <br />
        Gun builder | Prices Summary added
        <br />
        <br />
        February 25th 2022:
        <br />
        Gun builder | Sortable Tables
        <br />
        Ammo Graph page added
        <br />
        Hide sidebar functionality
        <br />
        <br />
        February 23rd 2022:
        <br />
        Gun builder | MOA calculation added
      </Text>
    </VStack>
  );
};

const NavItem = ({
  icon,
  isNew,
  bgColor,
  isSelected,
  isExternal,
  href,
  children,
  ...rest
}) => {
  let bg = isSelected && "tarkovYellow.50";

  if (bgColor) {
    bg = bgColor;
  }

  return (
    <Link
      href={href}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
      isExternal={isExternal}
    >
      <Flex
        align="center"
        px="4"
        py="4"
        role="group"
        cursor="pointer"
        fontWeight="bold"
        bg={bg}
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

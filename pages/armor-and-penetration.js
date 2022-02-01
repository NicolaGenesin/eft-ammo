import {
  Box,
  Container,
  Stack,
  Text,
  VStack,
  Heading,
  StackDivider,
  useColorModeValue,
  ListItem,
  UnorderedList,
  Link,
  Button,
  Center,
} from "@chakra-ui/react";

const ArmorAndPenetration = () => {
  return (
    <Box color="tarkovYellow.100" bg="vulcan.1000">
      <Container maxW={"7xl"} py="5%">
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Center mb="24px">
              <Link
                href="/nofoodaftermidnight"
                style={{ textDecoration: "none" }}
              >
                <Button
                  colorScheme="orange"
                  borderRadius="0"
                  color="black"
                  size="lg"
                >
                  Back to Ammo Chart
                </Button>
              </Link>
            </Center>
            <Heading
              align="center"
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              Armor, Penetration, and Damage
            </Heading>
            <Text fontSize={"2xl"} align="center">
              Original Source{" "}
              <Link
                style={{ textDecoration: "underline" }}
                href="https://tarkovaftermidnight.wordpress.com/2018/02/26/armor-and-penetration/"
              >
                Here
              </Link>
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text fontSize={"2xl"} fontWeight="bold">
                Armor Protection Basics
              </Text>
              <Text>
                Armor in EFT works by stopping bullets completely, preventing
                almost all damage to the body part it protects unless the bullet
                penetrates the armor. The processes and math involved are
                complex with a lot of different factors, but I will break down
                the process and give rough estimates of what you can expect from
                some of the more complicated parts.
              </Text>
              <Text fontSize={"2xl"} fontWeight="bold">
                Armor Penetration
              </Text>
              <Text>
                When your body is hit, if that body part that was hit (or head
                zone) has body armor or a helmet protecting it, the game checks
                to see if the bullet penetrates or doesn’t.
                <br />
                <br /> The penetration chance of a bullet hitting armor is
                calculated based on the armor’s level, the armor’s remaining
                durability %, and the ammo’s penetration value. The chance is
                then rolled to determine whether or not the bullet penetrates.
                <br />
                <br /> If the bullet penetrates, it deals between 0% and 40%
                less damage based on an algorithm that uses the bullet’s pen
                value and the armor’s class and durability %. There is a strong
                correlation between the penetration chance the penetrating round
                had, and the damage reduction applied to it: The higher the
                chance the less damage reduction, with high armor classes and
                high pen values of ammo having lower reductions than others.
                Most penetrations will be around 20% damage reduction when a
                bullet starts to penetrate an armor, but things like a PACA vs
                m995 will result in 0% reduction. <br />
                <br />
                If the bullet does not penetrate, “blunt damage” is applied,
                which lets through a % of the base damage of the bullet to the
                body part hit. This % is based on the specific armor’s “blunt
                throughput” stat, the pen value of the ammo, and the armor’s
                class and remaining durability %. Blunt damage is extremely low
                and not a notable factor in kill speed against anything other
                than level 2 body armors.
              </Text>

              <Text fontSize={"2xl"} fontWeight="bold">
                Durability
              </Text>
              <Text>
                Durability of armor is important, the lower the current % of
                durability remaining the less protection the armor offers
                overall. The durability % is calculated by dividing the current
                durability of the armor by the original maximum durability of
                the armor. Meaning a 60/60 armor is calculated as 60/80, or 75%.
                <br />
                <br /> The durability damage taken from bullets is based on the
                penetration value of the ammo and the armor level of the armor,
                multiplied by the ammo’s armor damage % and the armor material’s
                destructibility %. The minimum durability damage armor can take
                from a single hit is 1, including from individual buckshot
                pellets. Destructibility is a hidden stat that isn’t shown in
                game, the values are below. A penetrating round does a little
                bit less durability damage to armor than a round that does not
                penetrate. It varies, but is usually around 10-15% less.
              </Text>
              <Box w="100%">
                <UnorderedList>
                  <ListItem>“Aramid” 0.25</ListItem>
                  <ListItem>“UHMWPE” 0.45</ListItem>
                  <ListItem>“Titan” 0.55</ListItem>
                  <ListItem>“Aluminium” 0.6</ListItem>
                  <ListItem>“Combined Materials” 0.5</ListItem>
                  <ListItem>“Steel” 0.7</ListItem>
                  <ListItem>“Ceramic” 0.8</ListItem>
                  <ListItem>“Glass” 0.8</ListItem>
                </UnorderedList>
              </Box>
              <Text>
                If you want to find the effective durability of different armor
                to compare how durable different armors are, use the following
                formula: EffectiveDurability = Durability/Destructibility
              </Text>
              <Text fontSize={"2xl"} fontWeight="bold">
                Hitboxes and Armor Protection
              </Text>
              <Text>
                Hitboxes are always the same, whether you’re clad in armor or
                completely naked, they never change in size or shape. Armor
                simply provides it’s protection to specific hitboxes and head
                “zones”, and when those hitboxes are struck by a bullet the
                armor protects them. So no matter what armor you’re wearing they
                always provide the same area of protection to whatever body
                parts they say they protect on their inspection screen. So don’t
                be fooled by what an armor looks like, check the protection
                zones to see what it actually protects.
              </Text>
              <Text fontSize={"2xl"} fontWeight="bold">
                Head “Zones” and the head hitbox
              </Text>
              <Text>
                The head hitbox is split into 5 protection zones, each
                correlating with an angle of impact. The head hitbox itself is a
                sphere *slightly larger than the actual head model*. The “Top”
                zone angles create an area of protection in a circle around the
                top part of the head, starting at a few inches above the temples
                of the face and going all the way around. The “Eyes” covers the
                front 120 degrees horizontally and 30 degrees vertically,
                creating a small slit from the end of the “Top” zone down to
                about the tip of the nose. The “Jaws” is also the front 120
                degrees horizontally, and vertically starting from the bottom of
                the “Eyes” zone down to about the bottom of the neck, when
                facing forward. When tilted up, there may be a small sliver of
                unzoned head, which is always unprotected. The “Ears” cover a 60
                degree horizontal angle on both sides of the head between the
                “Nape” and the “Eyes” zone, going down to about the start of the
                neck on the head model. Below that is unzoned head and is always
                unprotected. It’s important to note that both the “Ears” zone
                and the unzoned head below it is visible from the front due to
                the cylindrical shape of the hitbox and the front zones’ angles
                only being 120 degrees wide. You can hit these by aiming for the
                very sides of the head when faced forward, even shooting past
                the actual model will hit the hitbox because it is larger than
                the head model. Finally, the “Nape” continues the last 120
                degrees horizontally between the two “Ears” zones and goes from
                the bottom of the “Top” zone down to the same location the
                “Ears” end, leaving some unprotected head at the bottom of the
                neck. In all, when wearing a helmet that covers all 5 zones,
                there is full coverage across most of your head except for the
                unzoned small slivers of neck below the “Ears” and “Nape”, and a
                tiny sliver of neck in the front when the head is tilted back.{" "}
                <br />
                <br />
                So don’t be fooled by how a helmet looks, what it actually
                protects are these zones, not what it looks like it protects.
              </Text>
              <Text fontSize={"2xl"} fontWeight="bold">
                Angles and Ricochets
              </Text>
              <Text>
                The angle of impact has no effect on armor except for helmets,
                which bullets can ricochet off of. If a bullet strikes a helmet
                within a certain range of angles, the round has a chance to
                ricochet determined by how shallow the angle is as well as the
                ricochet chance of both the ammo and the helmet. The required
                angles and the ricochet chance is determined by the helmet and
                is different for each individual helmet. If a ricochet occurs it
                is the same as the helmet stopping the penetration as far as the
                penetration calculation is concerned, and blunt damage and
                durability damage continue as they would normally, however the
                health and durability damage is significantly lowered to the
                point that there is almost no blunt damage received and the
                helmet almost always takes the minimum durability damage, which
                is 1.
              </Text>
              <Text fontSize={"2xl"} fontWeight="bold">
                Fragmentation
              </Text>
              <Text>
                Fragmentation is complicated, but at it’s core what happens when
                a bullet fragments is it creates two or more new bullets that
                have 50% of the original bullet’s damage and pen value *split
                between them*. So two fragments of a bullet with 100 damage and
                pen value would each have 25 damage and pen value, but 4 created
                from the same bullet would have 12.5 damage and pen value. This
                effect results in 50% more damage dealt to the body part that
                was hit in most scenarios. Rarely the fragments can penetrate
                the body part and hit another body part due to the fragments’
                change in direction that normally wouldn’t be hit, causing
                damage to nearby body parts. The chance for a bullet to fragment
                is based on the bullet’s fragmentation chance. Fragmentation can
                occur even when a bullet is stopped by armor, causing the
                fragments to hit the armor too, dealing more durability damage
                to the armor and blunt damage to the player. There is a serious
                bug however, where bullets under a certain threshold of pen
                value cannot fragment at all when hitting players, and the
                actual fragmentation chance is lower than bullets’ stat implies
                due to implementation. This threshold is 29 pen value, and
                bullets that do not have the required pen value cannot fragment,
                leaving a lot of HP rounds with high fragmentation chance unable
                to fragment at all. Other rounds may have significantly lower
                chances to fragment, based on another ammo stat called
                “Penetration Chance”, which affects the bullet’s ability to
                penetrate through objects (not armor).
              </Text>
            </VStack>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default ArmorAndPenetration;

import { withSentry } from "@sentry/nextjs";
import { dump } from "../../utils/bsg-data";

const getItems = async () => {
  const dataQuery = JSON.stringify({
    query: `
        { 
            guns: itemsByType(type: gun)  { id, lastLowPrice, gridImageLink, name, normalizedName, weight },
            mods: itemsByType(type: mods)  { id, lastLowPrice, gridImageLink, name, normalizedName, weight },
            ammos: itemsByType(type: ammo)  { id, lastLowPrice, gridImageLink, name, normalizedName, weight },  
        }
    `,
  });

  const response = await fetch("https://tarkov-tools.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: dataQuery,
  });

  const json = await response.json();

  return json.data;
};

const getData = async () => {
  const ttResponse = await getItems();
  const gunsOutput = {};
  const modsOutput = {};
  const ammoOutput = {};

  ttResponse.guns.forEach((gun) => {
    const gunDump = dump[gun.id];
    const slots = gunDump._props.Slots.map((slot) => {
      return {
        name: slot._name,
        ids: slot._props.filters[0].Filter,
      };
    });

    slots.forEach((slot) => {
      slot.ids.forEach((modId) => {
        const modDump = dump[modId];

        const ttMod = ttResponse.mods.find((ttMod) => ttMod.id === modId);

        const mod = {
          id: modDump._id,
          name: modDump._props.Name,
          shortName: modDump._props.ShortName,
          description: modDump._props.Description,
          weight: modDump._props.Weight,
          width: modDump._props.Width,
          height: modDump._props.Height,
          stackMaxSize: modDump._props.StackMaxSize,
          muzzleModType: modDump._props.muzzleModType,
          sightModType: modDump._props.sightModType,
          heatFactor: modDump._props.HeatFactor,
          coolFactor: modDump._props.CoolFactor,
          durabilityBurnModificator: modDump._props.DurabilityBurnModificator,
          durability: modDump._props.Durability,
          accuracy: modDump._props.Accuracy,
          recoil: modDump._props.Recoil,
          loudness: modDump._props.Loudness,
          effectiveDistance: modDump._props.EffectiveDistance,
          ergonomics: modDump._props.Ergonomics,
          velocity: modDump._props.Velocity,
          lastLowPrice: ttMod.lastLowPrice,
          imageUrl: ttMod.gridImageLink,
          normalizedName: ttMod.normalizedName,
        };

        if (modDump._props.Cartridges) {
          mod.cartridges =
            modDump._props.Cartridges[0]._props.filters[0].Filter;

          mod.cartridges.forEach((cartridgeId) => {
            const ammoDump = dump[cartridgeId];

            const ttAmmo = ttResponse.ammos.find(
              (ttAmmo) => ttAmmo.id === cartridgeId
            );

            if (ammoDump) {
              const ammo = {
                id: ammoDump._id,
                name: ammoDump._props.Name,
                shortName: ammoDump._props.ShortName,
                description: ammoDump._props.Description,
                weight: ammoDump._props.Weight,
                width: ammoDump._props.Width,
                height: ammoDump._props.Height,
                stackMaxSize: ammoDump._props.StackMaxSize,
                lastLowPrice: ttAmmo.lastLowPrice,
                imageUrl: ttAmmo.gridImageLink,
                normalizedName: ttAmmo.normalizedName,
              };

              ammoOutput[cartridgeId] = ammo;
            }
          });
        }

        modsOutput[modId] = mod;
      });
    });

    const ttGun = ttResponse.guns.find((ttGun) => ttGun.id === gun.id);

    gunsOutput[gun.id] = {
      id: gunDump._id,
      name: gunDump._props.Name,
      shortName: gunDump._props.ShortName,
      description: gunDump._props.Description,
      weight: gunDump._props.Weight,
      width: gunDump._props.Width,
      height: gunDump._props.Height,
      stackMaxSize: gunDump._props.StackMaxSize,
      lootExperience: gunDump._props.LootExperience,
      examineExperience: gunDump._props.ExamineExperience,
      repairCost: gunDump._props.RepairCost,
      repairSpeed: gunDump._props.RepairSpeed,
      lastLowPrice: ttGun.lastLowPrice,
      imageUrl: ttGun.gridImageLink,
      normalizedName: ttGun.normalizedName,
      slots,
    };
  });

  console.log("guns keys:", Object.keys(gunsOutput).length);
  console.log("mods keys:", Object.keys(modsOutput).length);
  console.log("ammo keys:", Object.keys(ammoOutput).length);

  return {
    gunsOutput,
    modsOutput,
    ammoOutput,
  };
};

const handler = async (req, res) => {
  res.setHeader("Cache-Control", "s-maxage=900, stale-while-revalidate");

  const { gunsOutput, modsOutput, ammoOutput } = await getData();

  res
    .status(200)
    .json({ guns: gunsOutput, mods: modsOutput, ammos: ammoOutput });
};

export default withSentry(handler);

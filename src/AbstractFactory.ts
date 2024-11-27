enum ProtectionVariant {
  Light,
  Medium,
  Heavy,
}

export interface Helmet {
  name: String;
  variant: ProtectionVariant;
}

export interface ChainMail {
  name: String;
  variant: ProtectionVariant;
}

export class HeavyHelmet implements Helmet {
  name = "Heavy Helmet";
  variant = ProtectionVariant.Heavy;
}

export class MediumHelmet implements Helmet {
  name = "Medium Helmet";
  variant = ProtectionVariant.Medium;
}

export class LightHelmet implements Helmet {
  name = "Light Helmet";
  variant = ProtectionVariant.Light;
}

export class HeavyChainMail implements ChainMail {
  name = "Heavy Chain Mail";
  variant = ProtectionVariant.Heavy;
}

export class MediumChainMail implements ChainMail {
  name = "Medium Chain Mail";
  variant = ProtectionVariant.Medium;
}

export class LightChainMail implements ChainMail {
  name = "Light Chain Mail";
  variant = ProtectionVariant.Light;
}

abstract class ArmorSmith {
  abstract createHelmet(): Helmet;
  abstract createChainMain(): ChainMail;
}

export class LightArmorSmith extends ArmorSmith {
  createHelmet(): Helmet {
    return new LightHelmet();
  }
  createChainMain(): ChainMail {
    return new LightChainMail();
  }
}

export class MediumArmorSmith extends ArmorSmith {
  createHelmet(): Helmet {
    return new MediumHelmet();
  }
  createChainMain(): ChainMail {
    return new MediumChainMail();
  }
}

export class HeavyArmorSmith extends ArmorSmith {
  createHelmet(): Helmet {
    return new HeavyHelmet();
  }
  createChainMain(): ChainMail {
    return new HeavyChainMail();
  }
}

export class Customer {
  armorSmith: ArmorSmith;
  helmet: Helmet | null;
  chainMail: ChainMail | null;

  constructor(smith: ArmorSmith) {
    this.armorSmith = smith;
    this.helmet = null;
    this.chainMail = null;
  }

  buyFullArmor() {
    this.helmet = this.armorSmith.createHelmet();
    this.chainMail = this.armorSmith.createChainMain();
  }
}

import { getLandingPage } from "@shopware-pwa/api-client";
import { LandingPage } from "@shopware-pwa/types";
import { useShopwareContext } from "./useShopwareContext";
import { cmsAssociations } from "./cms/cmsAssociations";
import { _useContext } from "./internal/_useContext";

export type UseLandingSearchReturn = {
  search: (
    navigationId: string,
    options?: {
      withCmsAssociations?: boolean;
    }
  ) => Promise<LandingPage>;
};

export function useLandingSearch(): {
  search: (
    navigationId: string,
    options?: {
      withCmsAssociations?: boolean;
    }
  ) => Promise<LandingPage>;
} {
  const { apiInstance } = useShopwareContext();

  const search = async (
    navigationId: string,
    options?: {
      withCmsAssociations?: boolean;
    }
  ) => {
    const associations = options?.withCmsAssociations && cmsAssociations;
    const result = await getLandingPage(
      navigationId,
      associations || {},
      apiInstance
    );
    return result;
  };

  return {
    search,
  };
}

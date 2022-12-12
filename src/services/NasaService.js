import { baseURL } from "../constants";

export const NasaServiceEventType = {
  Events: "events",
  Categories: "categories",
};

class NasaService {
  async _handleRequest(type, parameters = {}) {
    try {
      const url = new URL(`${baseURL}/${type}`);
      // Append parameters
      for (let [key, value] of Object.entries(parameters)) {
        url.searchParams.set(key, value);
      }
      const response = await fetch(url.href, {
        method: "GET",
      });
      const data = await response.json();
    //   this.stored[type] = data;
      return data;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getEvents(limit) {
    return await this._handleRequest(NasaServiceEventType.Events, { limit });
  }

  async getCategories() {
    return await this._handleRequest(NasaServiceEventType.Categories);
  }
}

export default new NasaService();

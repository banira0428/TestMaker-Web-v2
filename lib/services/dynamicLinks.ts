import firebase from "../init";
import axios from "axios";

export const createDynamicLinks = async (documentId: string) => {
  const apn = "jp.gr.java_conf.foobar.testmaker.service";
  const amv = "87";
  const ibi = "jp.gr.java-conf.foobar.testmaker.service";
  const isi = "1201200202";
  const imv = "2.1.5";

  const client = axios.create({
    baseURL: "https://firebasedynamiclinks.googleapis.com",
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
    responseType: "json",
  });

  const response = await client.post(
    `/v1/shortLinks?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
    {
      longDynamicLink: `https://testmaker.page.link?link=https://ankimaker.com/${documentId}&apn=${apn}&amv=${amv}&ibi=${ibi}&isi=${isi}&imv=${imv}`,
    }
  );
  return response.data.shortLink;
};

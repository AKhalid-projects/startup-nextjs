import AboutSectionOne from "@/components/About/AboutSectionOne";
import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Video from "@/components/Video";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Page | CSTR Project Demo",
  description: "This is About Page for CSTR Project Demo",
  // other metadata
};

const TuningPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Tuning Page"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In varius eros eget sapien consectetur ultrices. Ut quis dapibus libero."
      />
      <Video />
      <AboutSectionOne />
      <AboutSectionTwo />
    </>
  );
};

export default TuningPage;

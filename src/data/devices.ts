// 设备数据配置文件

export interface Device {
	name: string;
	image: string;
	specs: string;
	description: string;
	link: string;
}

// 设备类别类型，支持品牌和自定义类别
export type DeviceCategory = {
	[categoryName: string]: Device[];
} & {
	自定义?: Device[];
};

export const devicesData: DeviceCategory = {
  Samsung: [
    {
      name: "Samsung Galaxy ZFold3",
      images: "/images/device/galaxy_zfold3.png",
      specs: "Black / 12G + 512GB",
      description: "Asshole Snapdragon 888, Heat like hell, 25W slowly Charging.",
      link: "https://www.samsung.com/hk/smartphones/galaxy-z-fold3-5g/specs/?srsltid=AfmBOorHVLqA7KHjF39NOvQvKUbtMyhE5-8alvAC51mqk-lziavMkDbf",
    },

    {
      name: "Samsung Galaxy S20",
      images: "/images/device/galaxy_s20.png",
      specs: "Gray / 12G + 128GB",
      description: "Unparalleled feel on 6.2 inch, Flagship performance Snapdragon 865, 25w slowly Charging.",
      link: "https://www.samsung.com/hk/support/useful-guide-to-use-galaxy-s20-series/?srsltid=AfmBOorClvhXZ_RCKSZW74rnfRGd-iPy8DcSauB1xBtduW4l3e5IZY3LlG",
    },
  ],


	//OnePlus: [
	//	{
	//		name: "OnePlus 13T",
	//		image: "/images/device/oneplus13t.png",
	//		specs: "Gray / 16G + 1TB",
	//		description: "Flagship performance, Hasselblad imaging, 80W SuperVOOC.",
	//		link: "https://www.oneplus.com/cn/13t",
	//	},
	//],
	//Router: [
	//	{
	//		name: "GL-MT3000",
	//		image: "/images/device/mt3000.png",
	//		specs: "1000Mbps / 2.5G",
	//		description:
	//			"Portable WiFi 6 router suitable for business trips and home use.",
	//		link: "https://www.gl-inet.cn/products/gl-mt3000/",
	//	},
	//],
};

"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { useOnClickOutside, useWindowSize } from "usehooks-ts";
import { AnimatePresence, motion } from "framer-motion";

const variants = {
  initial: { y: 10, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -10, opacity: 0 },
};

export default function ModalAnimationPage() {
  const [modalId, setModalId] = useState(0);
  const { width } = useWindowSize();
  const numberOfColumns =
    width && width < 420 ? 1 : width && width > 420 && width < 768 ? 2 : 3;

  const ref = useRef(null);
  useOnClickOutside(ref, () => setModalId(0));

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setModalId(0);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const selectedModalContent = initialItems.find((item) => item.id === modalId);

  return (
    <div className="p-4 bg-slate-950 relative h-full">
      <AnimatePresence>
        {modalId && selectedModalContent && (
          <>
            <motion.div
              ref={ref}
              className="absolute inset-0 h-full w-full bg-black/90 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="inset-0 h-screen w-screen absolute z-20 flex justify-center items-center"
              layoutId={`${modalId}-btn`}
            >
              <div className="w-1/2 h-2/3 flex flex-col rounded-xl overflow-hidden">
                <div className="w-full h-full relative">
                  <motion.p
                    className="absolute bottom-2 right-2 rounded-lg bg-black/50 px-2 text-white"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={variants}
                    transition={{ duration: 0.2, delay: 0.4 }}
                    key={selectedModalContent.id}
                  >
                    @{selectedModalContent.photographer}
                  </motion.p>
                  <motion.img
                    src={selectedModalContent?.src.large}
                    alt=""
                    className="w-full h-full aspect-square"
                    layoutId={`${modalId}-img`}
                  />
                </div>
                <motion.p className="bg-slate-800 text-slate-400 py-8 px-6">
                  Discover the nostalgic charm of this retro cabinet captured by{" "}
                  {selectedModalContent.photographer}. Featuring framed black
                  and white photos, decorative vases, and a stack of books with
                  a vase of dry reeds, this beautifully composed scene evokes a
                  sense of timeless elegance. <br />
                  The warm, muted tones add to the vintage atmosphere, making it
                  a perfect addition to any classic interior design. View the
                  full image and more of their work on Pexels.
                </motion.p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <div className="flex place-content-stretch gap-8">
        {[...Array(numberOfColumns)].map((_, index) => (
          <div
            key={index}
            className="flex-1 flex flex-col place-content-stretch gap-8"
          >
            <AnimatePresence>
              {initialItems.map((item, i) => (
                <Fragment key={item.id}>
                  {i % numberOfColumns === index && (
                    <Card
                      key={item.id}
                      item={item}
                      modalId={modalId}
                      onClick={() => setModalId(item.id)}
                    />
                  )}
                </Fragment>
              ))}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

const Card = ({
  item,
  modalId,
  onClick,
}: {
  item: (typeof initialItems)[0];
  modalId: number;
  onClick: () => void;
}) => {
  return (
    <motion.button
      className="w-full h-full cursor-pointer relative"
      onClick={onClick}
      layoutId={`${item.id}-btn`}
    >
      {item.id !== modalId && (
        <motion.p
          className="absolute bottom-2 right-2 rounded-lg bg-black/50 px-2 text-white"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.2, delay: 0.4 }}
          key={item.id}
        >
          @{item.photographer}
        </motion.p>
      )}
      <motion.img
        src={item.src.large}
        alt=""
        className="w-full h-full rounded-xl overflow-hidden"
        layoutId={`${item.id}-img`}
      />
    </motion.button>
  );
};

const initialItems = [
  {
    id: 6662900,
    width: 3568,
    height: 5281,
    url: "https://www.pexels.com/photo/retro-cabinet-with-framed-photos-and-books-composed-with-decorative-vases-6662900/",
    photographer: "Anastasiya Vragova",
    photographer_url: "https://www.pexels.com/@anastasiya-vragova-22991246",
    photographer_id: 22991246,
    avg_color: "#938F8B",
    src: {
      original:
        "https://images.pexels.com/photos/6662900/pexels-photo-6662900.jpeg",
      large2x:
        "https://images.pexels.com/photos/6662900/pexels-photo-6662900.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      large:
        "https://images.pexels.com/photos/6662900/pexels-photo-6662900.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      medium:
        "https://images.pexels.com/photos/6662900/pexels-photo-6662900.jpeg?auto=compress&cs=tinysrgb&h=350",
      small:
        "https://images.pexels.com/photos/6662900/pexels-photo-6662900.jpeg?auto=compress&cs=tinysrgb&h=130",
      portrait:
        "https://images.pexels.com/photos/6662900/pexels-photo-6662900.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      landscape:
        "https://images.pexels.com/photos/6662900/pexels-photo-6662900.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      tiny: "https://images.pexels.com/photos/6662900/pexels-photo-6662900.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
    },
    liked: false,
    alt: "Framed black and white photos and decorative elements arranged on wooden cabinet near vase with dry reeds placed on stack of books",
  },
  {
    id: 7014339,
    width: 4000,
    height: 6000,
    url: "https://www.pexels.com/photo/table-with-various-photos-and-scissors-7014339/",
    photographer: "George Milton",
    photographer_url: "https://www.pexels.com/@george-milton",
    photographer_id: 19162611,
    avg_color: "#A29C92",
    src: {
      original:
        "https://images.pexels.com/photos/7014339/pexels-photo-7014339.jpeg",
      large2x:
        "https://images.pexels.com/photos/7014339/pexels-photo-7014339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      large:
        "https://images.pexels.com/photos/7014339/pexels-photo-7014339.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      medium:
        "https://images.pexels.com/photos/7014339/pexels-photo-7014339.jpeg?auto=compress&cs=tinysrgb&h=350",
      small:
        "https://images.pexels.com/photos/7014339/pexels-photo-7014339.jpeg?auto=compress&cs=tinysrgb&h=130",
      portrait:
        "https://images.pexels.com/photos/7014339/pexels-photo-7014339.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      landscape:
        "https://images.pexels.com/photos/7014339/pexels-photo-7014339.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      tiny: "https://images.pexels.com/photos/7014339/pexels-photo-7014339.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
    },
    liked: false,
    alt: "Table with various photos and scissors",
  },
  {
    id: 3844786,
    width: 3024,
    height: 4032,
    url: "https://www.pexels.com/photo/abstract-background-spills-of-multicolored-paint-3844786/",
    photographer: "Dids .",
    photographer_url: "https://www.pexels.com/@didsss",
    photographer_id: 447505,
    avg_color: "#84735E",
    src: {
      original:
        "https://images.pexels.com/photos/3844786/pexels-photo-3844786.jpeg",
      large2x:
        "https://images.pexels.com/photos/3844786/pexels-photo-3844786.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      large:
        "https://images.pexels.com/photos/3844786/pexels-photo-3844786.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      medium:
        "https://images.pexels.com/photos/3844786/pexels-photo-3844786.jpeg?auto=compress&cs=tinysrgb&h=350",
      small:
        "https://images.pexels.com/photos/3844786/pexels-photo-3844786.jpeg?auto=compress&cs=tinysrgb&h=130",
      portrait:
        "https://images.pexels.com/photos/3844786/pexels-photo-3844786.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      landscape:
        "https://images.pexels.com/photos/3844786/pexels-photo-3844786.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      tiny: "https://images.pexels.com/photos/3844786/pexels-photo-3844786.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
    },
    liked: false,
    alt: "Abstract background of chaotic waves painted in different shades of blue and orange colors",
  },
  {
    id: 3797928,
    width: 5935,
    height: 3949,
    url: "https://www.pexels.com/photo/different-photographs-placed-next-to-each-other-3797928/",
    photographer: "Brett Sayles",
    photographer_url: "https://www.pexels.com/@brett-sayles",
    photographer_id: 320794,
    avg_color: "#5E4A3C",
    src: {
      original:
        "https://images.pexels.com/photos/3797928/pexels-photo-3797928.jpeg",
      large2x:
        "https://images.pexels.com/photos/3797928/pexels-photo-3797928.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      large:
        "https://images.pexels.com/photos/3797928/pexels-photo-3797928.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      medium:
        "https://images.pexels.com/photos/3797928/pexels-photo-3797928.jpeg?auto=compress&cs=tinysrgb&h=350",
      small:
        "https://images.pexels.com/photos/3797928/pexels-photo-3797928.jpeg?auto=compress&cs=tinysrgb&h=130",
      portrait:
        "https://images.pexels.com/photos/3797928/pexels-photo-3797928.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      landscape:
        "https://images.pexels.com/photos/3797928/pexels-photo-3797928.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      tiny: "https://images.pexels.com/photos/3797928/pexels-photo-3797928.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
    },
    liked: false,
    alt: "From below closeup of various blurred vertical photos in collage placed next to each other",
  },
  {
    id: 4226871,
    width: 5472,
    height: 3648,
    url: "https://www.pexels.com/photo/stylish-various-eyeglasses-for-vision-correction-4226871/",
    photographer: "Karolina Grabowska",
    photographer_url: "https://www.pexels.com/@karolina-grabowska",
    photographer_id: 2332540,
    avg_color: "#DBD2CA",
    src: {
      original:
        "https://images.pexels.com/photos/4226871/pexels-photo-4226871.jpeg",
      large2x:
        "https://images.pexels.com/photos/4226871/pexels-photo-4226871.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      large:
        "https://images.pexels.com/photos/4226871/pexels-photo-4226871.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      medium:
        "https://images.pexels.com/photos/4226871/pexels-photo-4226871.jpeg?auto=compress&cs=tinysrgb&h=350",
      small:
        "https://images.pexels.com/photos/4226871/pexels-photo-4226871.jpeg?auto=compress&cs=tinysrgb&h=130",
      portrait:
        "https://images.pexels.com/photos/4226871/pexels-photo-4226871.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      landscape:
        "https://images.pexels.com/photos/4226871/pexels-photo-4226871.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      tiny: "https://images.pexels.com/photos/4226871/pexels-photo-4226871.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
    },
    liked: false,
    alt: "Stylish various eyeglasses for vision correction",
  },
  {
    id: 5997939,
    width: 4957,
    height: 3914,
    url: "https://www.pexels.com/photo/collection-of-framed-photos-on-wall-5997939/",
    photographer: "Max Rahubovskiy",
    photographer_url: "https://www.pexels.com/@heyho",
    photographer_id: 3871980,
    avg_color: "#8D8889",
    src: {
      original:
        "https://images.pexels.com/photos/5997939/pexels-photo-5997939.jpeg",
      large2x:
        "https://images.pexels.com/photos/5997939/pexels-photo-5997939.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      large:
        "https://images.pexels.com/photos/5997939/pexels-photo-5997939.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      medium:
        "https://images.pexels.com/photos/5997939/pexels-photo-5997939.jpeg?auto=compress&cs=tinysrgb&h=350",
      small:
        "https://images.pexels.com/photos/5997939/pexels-photo-5997939.jpeg?auto=compress&cs=tinysrgb&h=130",
      portrait:
        "https://images.pexels.com/photos/5997939/pexels-photo-5997939.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      landscape:
        "https://images.pexels.com/photos/5997939/pexels-photo-5997939.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      tiny: "https://images.pexels.com/photos/5997939/pexels-photo-5997939.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
    },
    liked: false,
    alt: "Collection of framed photos on wall",
  },
  {
    id: 3844790,
    width: 4032,
    height: 3024,
    url: "https://www.pexels.com/photo/abstract-background-of-chaotic-spreading-paints-across-surface-3844790/",
    photographer: "Dids .",
    photographer_url: "https://www.pexels.com/@didsss",
    photographer_id: 447505,
    avg_color: "#776053",
    src: {
      original:
        "https://images.pexels.com/photos/3844790/pexels-photo-3844790.jpeg",
      large2x:
        "https://images.pexels.com/photos/3844790/pexels-photo-3844790.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      large:
        "https://images.pexels.com/photos/3844790/pexels-photo-3844790.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      medium:
        "https://images.pexels.com/photos/3844790/pexels-photo-3844790.jpeg?auto=compress&cs=tinysrgb&h=350",
      small:
        "https://images.pexels.com/photos/3844790/pexels-photo-3844790.jpeg?auto=compress&cs=tinysrgb&h=130",
      portrait:
        "https://images.pexels.com/photos/3844790/pexels-photo-3844790.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      landscape:
        "https://images.pexels.com/photos/3844790/pexels-photo-3844790.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      tiny: "https://images.pexels.com/photos/3844790/pexels-photo-3844790.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
    },
    liked: false,
    alt: "Mixed bright yellow and red paints spill against different saturation blue paints on canvas",
  },
  {
    id: 3844796,
    width: 3024,
    height: 4032,
    url: "https://www.pexels.com/photo/abstract-multicolored-waves-chaotically-spilling-over-surface-3844796/",
    photographer: "Dids .",
    photographer_url: "https://www.pexels.com/@didsss",
    photographer_id: 447505,
    avg_color: "#7E6E6F",
    src: {
      original:
        "https://images.pexels.com/photos/3844796/pexels-photo-3844796.jpeg",
      large2x:
        "https://images.pexels.com/photos/3844796/pexels-photo-3844796.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      large:
        "https://images.pexels.com/photos/3844796/pexels-photo-3844796.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      medium:
        "https://images.pexels.com/photos/3844796/pexels-photo-3844796.jpeg?auto=compress&cs=tinysrgb&h=350",
      small:
        "https://images.pexels.com/photos/3844796/pexels-photo-3844796.jpeg?auto=compress&cs=tinysrgb&h=130",
      portrait:
        "https://images.pexels.com/photos/3844796/pexels-photo-3844796.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      landscape:
        "https://images.pexels.com/photos/3844796/pexels-photo-3844796.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      tiny: "https://images.pexels.com/photos/3844796/pexels-photo-3844796.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
    },
    liked: false,
    alt: "Abstract background of random spills of multicolored paint depicted to surface of canvas",
  },
  {
    id: 3816395,
    width: 6048,
    height: 4024,
    url: "https://www.pexels.com/photo/collection-of-colorful-photo-collage-on-wall-at-home-3816395/",
    photographer: "Brett Sayles",
    photographer_url: "https://www.pexels.com/@brett-sayles",
    photographer_id: 320794,
    avg_color: "#5A4440",
    src: {
      original:
        "https://images.pexels.com/photos/3816395/pexels-photo-3816395.jpeg",
      large2x:
        "https://images.pexels.com/photos/3816395/pexels-photo-3816395.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      large:
        "https://images.pexels.com/photos/3816395/pexels-photo-3816395.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      medium:
        "https://images.pexels.com/photos/3816395/pexels-photo-3816395.jpeg?auto=compress&cs=tinysrgb&h=350",
      small:
        "https://images.pexels.com/photos/3816395/pexels-photo-3816395.jpeg?auto=compress&cs=tinysrgb&h=130",
      portrait:
        "https://images.pexels.com/photos/3816395/pexels-photo-3816395.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      landscape:
        "https://images.pexels.com/photos/3816395/pexels-photo-3816395.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      tiny: "https://images.pexels.com/photos/3816395/pexels-photo-3816395.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
    },
    liked: false,
    alt: "Collection of colorful photo collage on wall at home",
  },
  {
    id: 4992947,
    width: 4802,
    height: 3578,
    url: "https://www.pexels.com/photo/vintage-notebook-among-photo-cameras-with-lenses-4992947/",
    photographer: "Rachel Claire",
    photographer_url: "https://www.pexels.com/@rachel-claire",
    photographer_id: 2272619,
    avg_color: "#262626",
    src: {
      original:
        "https://images.pexels.com/photos/4992947/pexels-photo-4992947.jpeg",
      large2x:
        "https://images.pexels.com/photos/4992947/pexels-photo-4992947.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      large:
        "https://images.pexels.com/photos/4992947/pexels-photo-4992947.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      medium:
        "https://images.pexels.com/photos/4992947/pexels-photo-4992947.jpeg?auto=compress&cs=tinysrgb&h=350",
      small:
        "https://images.pexels.com/photos/4992947/pexels-photo-4992947.jpeg?auto=compress&cs=tinysrgb&h=130",
      portrait:
        "https://images.pexels.com/photos/4992947/pexels-photo-4992947.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
      landscape:
        "https://images.pexels.com/photos/4992947/pexels-photo-4992947.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      tiny: "https://images.pexels.com/photos/4992947/pexels-photo-4992947.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
    },
    liked: false,
    alt: "Vintage notebook among photo cameras with lenses",
  },
];

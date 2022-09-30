import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { useState, useEffect, useContext, setState, useCallback } from 'react';

import type { NextPageWithLayout } from '@/types';
import DashboardLayout from '@/layouts/_dashboard';

import LiquidityChart from '@/components/ui/chats/liquidity-chart';
import VolumeChart from '@/components/ui/chats/volume-chart';

import Avatar from '@/components/ui/avatar';
import TopupButton from '@/components/ui/topup-button';
//images
import AuthorImage from '@/assets/images/author.png';
import BinanceImage from '@/assets/images/coin/binance.svg';
import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/evm-utils';
import Image from '@/components/ui/image';

import { Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Logo from '@/assets/images/logo.png';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export const HomePage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  const [isLoading, setIsLoading] = useState(true);
  const sliderBreakPoints = {
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1080: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    1280: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    1700: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    2200: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
  };

  useEffect(() => {
    fetchData();
    setIsLoading(false);
  }, []);

  const [metadata, setMetadata] = useState([]);
  const [tokendata, setTokendata] = useState([]);
  async function fetchData() {
    /*console.log('addressasf', walleta);*/

    const chain = EvmChain.BSC;
    const addressone = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c';
    const addresspcs = '0x24A8EB1b906bB10d79351d4A65AbEd56baFa0B0f';
    const exchangeAddress = process.env.NEXT_PUBLIC_PRICE_EXCHANGE_ADDRESS;
    await Moralis.start({
      apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
    });
    const response = await Moralis.EvmApi.token.getTokenPrice({
      address: addressone,
      chain,
      exchangeAddress,
    });
    const responsepcs = await Moralis.EvmApi.token.getTokenPrice({
      address: addresspcs,
      chain,
      exchangeAddress,
    });

    const coins = response.result;
    setMetadata(coins);
    setTokendata(responsepcs.result);
  }

  return (
    <>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div>
          <div className="flex flex-wrap">
            <div className="mb-8 w-full sm:mb-0 sm:w-1/2 sm:ltr:pr-6 sm:rtl:pl-6 md:w-[calc(100%-256px)] lg:w-[calc(100%-288px)] 2xl:w-[calc(100%-320px)] 3xl:w-[calc(100%-358px)]">
              <Swiper
                modules={[Scrollbar, A11y]}
                spaceBetween={24}
                slidesPerView={1}
                scrollbar={{ draggable: true }}
                breakpoints={sliderBreakPoints}
                observer={true}
                dir="ltr"
              >
                <SwiperSlide>
                  <div>
                    <div className="relative rounded-lg bg-bnb p-6 xl:p-8">
                      <h4 className="mb-8 text-sm font-medium uppercase tracking-wider text-gray-900">
                        Binance Coin
                      </h4>
                      <div className="relative h-20 lg:h-24 xl:h-28 3xl:h-36">
                        <Image
                          src={BinanceImage}
                          layout="fill"
                          objectFit="contain"
                          objectPosition={0}
                        />
                      </div>
                      <div className="mt-8 mb-2 text-sm font-medium tracking-wider text-gray-900 lg:text-lg 2xl:text-xl 3xl:text-2xl">
                        {metadata.exchangeName} -
                        <span className="uppercase"> BNB</span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-medium 2xl:text-sm">
                        <span className="tracking-wider text-gray-600">
                          {metadata.usdPrice} USD
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div>
                    <div className="relative rounded-lg bg-tte p-6 xl:p-8">
                      <h4 className="text-white-900 mb-8 text-sm font-medium uppercase tracking-wider">
                        Tik Token
                      </h4>
                      <div className="relative h-20 lg:h-24 xl:h-28 3xl:h-36">
                        <Image
                          src={Logo}
                          layout="fill"
                          objectFit="contain"
                          objectPosition={0}
                        />
                      </div>
                      <div className="text-white-900 mt-8 mb-2 text-sm font-medium tracking-wider lg:text-lg 2xl:text-xl 3xl:text-2xl">
                        {tokendata.exchangeName} -
                        <span className="uppercase"> TT2E</span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-medium 2xl:text-sm">
                        <span className="text-white-600 tracking-wider">
                          {tokendata.usdPrice} USD
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
            <div className="w-full sm:w-1/2 md:w-64 lg:w-72 2xl:w-80 3xl:w-[358px]">
              <div className="flex h-full flex-col justify-center rounded-lg bg-white p-6 shadow-card dark:bg-light-dark xl:p-8">
                <Avatar
                  image={AuthorImage}
                  alt="Author"
                  className="mx-auto mb-6"
                  size="lg"
                />
                <h3 className="mb-2 text-center text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 3xl:mb-3">
                  Tik Token Balance
                </h3>
                <div className="mb-7 text-center font-medium tracking-tighter text-gray-900 dark:text-white xl:text-2xl 3xl:mb-8 3xl:text-[32px]">
                  4356 TT2E
                </div>
                <TopupButton />
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 sm:my-10 md:grid-cols-2">
            <LiquidityChart />
            <VolumeChart />
          </div>
        </div>
      )}
    </>
  );
};

HomePage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default HomePage;

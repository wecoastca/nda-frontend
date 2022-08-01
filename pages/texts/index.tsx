import { GetStaticProps } from 'next';
import { Layout, Modal } from '../../components';
import { fetchAPI } from '../../lib/api';
import Link from 'next/link';
import md5 from 'md5';
import React, { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const TextsTable = ({ texts, activeCategory }) => {
  if (texts?.length === 0) {
    return (
      <div className="empty-text-block relative flex-1 flex flex-col justify-center"></div>
    );
  }

  const { category, setCategory } = activeCategory;

  return (
    <div className="grid overflow-x-scroll md:grid-cols-2 lg:grid-cols-none lg:grid-rows-2 lg:grid-flow-col lg:w-[54vw] lg:auto-cols-[100%] xl:auto-cols-[50%] 2xl:auto-cols-[33%]">
      {texts
        ?.filter(
          (x) =>
            !!x?.attributes?.categories?.data?.find(
              (z) => z?.attributes?.name === category
            ) || category === 'all'
        )
        .map((text) => {
          return (
            <div
              key={text?.id}
              className={`border-[#FA6400] border-b border-r hover:border-[#FD6703] hover:border-2 hover:border-t-[1px]md:border-r  lg:even:border-b-0 lg:even:hover:border-b lg:even:hover:border-l lg:even:hover:border-t lg:odd:hover:border-l lg:odd:hover:border-t px-8 py-12 flex flex-col gap-8 work-block `}
            >
              <div className="relative flex gap-5 flex-wrap whitespace-nowrap">
                {text?.attributes?.categories?.data?.map((c) => (
                  <div key={c?.id}>
                    <div
                      className={`blur-md h-8 absolute -z-10`}
                      id="blurCircle"
                      style={{
                        background: c?.attributes?.color,
                        width: c?.attributes?.name.length * 12,
                      }}
                    ></div>
                    <button
                      value={c?.attributes?.name}
                      onClick={(e) => setCategory(e?.currentTarget?.value)}
                      className={`hover:opacity-20 visited:line-through inline-block`}
                    >
                      <span className="text-base z-10">
                        {c?.attributes?.name}
                      </span>
                    </button>
                  </div>
                ))}
              </div>
              <Link
                href={`/texts/${encodeURIComponent(text?.attributes?.slug)}`}
              >
                <a>
                  <p className="hover:opacity-20 text-lg">
                    {text?.attributes?.title}
                  </p>
                </a>
              </Link>
            </div>
          );
        })}
    </div>
  );
};

interface SubscriptionStatus {
  ok: boolean;
  detail: string;
}

const SubscriptionForm = ({
  subscription,
  onSubmit,
  status: [, setSubscriptionStatus],
}: {
  subscription?: any;
  onSubmit: ({ email }: { email: string }) => void;
  status: [SubscriptionStatus, any];
}) => {
  const { title, placeholder, buttonText, buttonColor } =
    subscription?.attributes;
  const [email, setEmail] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit && onSubmit({ email });
    const subscriberHash = md5(email.toLowerCase());

    fetch(`/mailchimp/lists/6d9e00ac16/members/${subscriberHash}`, {
      method: 'PUT',
      headers: {
        Authorization: `apikey ${process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status_if_new: 'pending',
      }),
    })
      .then((r) => {
        setSubscriptionStatus((s: SubscriptionStatus) => ({ ...s, ok: r?.ok }));
        return r.json();
      })
      .then((x) => {
        setSubscriptionStatus((s) => ({
          ...s,
          detail: s?.ok
            ? 'Success! You are subscribed'
            : x?.detail || 'Something went wrong!',
        }));
      });
  };
  return (
    <form className="flex flex-col gap-8 w-full" onSubmit={handleSubmit}>
      <span className={`text-sm md:text-xl xl:text-2xl px-4`}>{title}</span>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border-[#FA6400] border-y text-2xl px-5"
        placeholder={placeholder}
      />
      <div className="px-7">
        <div
          className={`blur-md h-8 absolute -z-10`}
          id="blurCircle"
          style={{
            background: `${buttonColor}`,
            width: buttonText?.length * 12,
          }}
        ></div>
        <button type="submit" className={`hover:opacity-20 inline-block`}>
          <span className="text-base z-10">{buttonText}</span>
        </button>
      </div>
    </form>
  );
};

const TemporaryWarning = ({ status, visibility }) => {
  const [warningVisible, setWarningVisible] = visibility;

  useEffect(() => {
    setTimeout(() => {
      setWarningVisible(false);
    }, 15000);
  }, [warningVisible, setWarningVisible]);

  return (
    warningVisible && (
      <span
        className="text-base px-4 block lg:mt-auto"
        style={{
          color: `${status?.ok ? '#43A335' : '#E7372B'}`,
        }}
      >
        {status?.detail}
      </span>
    )
  );
};

const Subscription = ({
  modalVisibility,
  subscriptionData,
  isMobile,
}: {
  modalVisibility: [boolean, (a: boolean) => void];
  subscriptionData: any;
  isMobile: boolean;
}) => {
  const [warningVisible, setWarningVisible] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = modalVisibility;
  const [subscriptionStatus, setSubscriptionStatus] =
    useState<SubscriptionStatus>({ ok: null, detail: null });

  const handleOnSubmit = () => {
    setWarningVisible(true);
  };

  if (isMobile) {
    return (
      <Modal
        isVisible={isModalVisible}
        onBackButtonClick={() => setIsModalVisible(!isModalVisible)}
        Header={() => (
          <TemporaryWarning
            status={subscriptionStatus}
            visibility={[warningVisible, setWarningVisible]}
          />
        )}
      >
        <SubscriptionForm
          subscription={subscriptionData}
          onSubmit={handleOnSubmit}
          status={[subscriptionStatus, setSubscriptionStatus]}
        />
      </Modal>
    );
  }
  return (
    <>
      <TemporaryWarning
        status={subscriptionStatus}
        visibility={[warningVisible, setWarningVisible]}
      />
      <SubscriptionForm
        subscription={subscriptionData}
        onSubmit={handleOnSubmit}
        status={[subscriptionStatus, setSubscriptionStatus]}
      />
    </>
  );
};

const Texts = ({ categories, texts, subscription }) => {
  const router = useRouter();
  const { c } = router?.query;
  const [category, setCategory] = useState<string>((c as string) || 'all');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
  }, []);

  const handleOnSubscribe = () => {
    setIsModalVisible(true);
  };
  return (
    <Layout>
      <div className="shrink-0 flex flex-col justify-between  border-[#FA6400] border-b lg:border-b-0 lg:border-r lg:w-[42vw] lg:py-28">
        <ul className="flex text-sm gap-9 w-screen overflow-scroll px-4 md:text-xl md:gap-16 lg:gap-5 lg:w-auto lg:flex-col xl:text-2xl xl:px-6">
          {isMobile && (
            <li className="relative h-fit">
              <div
                className={`blur-md absolute top-2 -left-1 -z-10 w-full h-3/4`}
                id="blurCircle"
                style={{
                  background: `${subscription?.attributes?.buttonColor}`,
                }}
              ></div>
              <button
                className={`hover:opacity-20`}
                onClick={handleOnSubscribe}
              >
                {subscription?.attributes?.buttonText}
              </button>
            </li>
          )}
          <li>
            <button
              value={'all'}
              onClick={(e) => setCategory(e?.currentTarget?.value)}
              className={`hover:opacity-20 visited:line-through ${
                category === 'all' ? 'line-through' : null
              }`}
            >
              all
            </button>
          </li>
          {categories?.map((item) => (
            <li key={item.id}>
              <button
                value={item?.attributes.name}
                onClick={(e) => setCategory(e?.currentTarget?.value)}
                className={`hover:opacity-20 visited:line-through w-max ${
                  category === item.attributes?.name ? 'line-through' : null
                }`}
              >
                {item?.attributes?.name}
              </button>
            </li>
          ))}
        </ul>
        <Subscription
          subscriptionData={subscription}
          isMobile={isMobile}
          modalVisibility={[isModalVisible, setIsModalVisible]}
        />
      </div>
      <TextsTable texts={texts} activeCategory={{ category, setCategory }} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const [{ data: categories }, { data: texts }, { data: subscription }] =
    await Promise.all([
      fetchAPI('/text-categories', { populate: '*' }),
      fetchAPI('/texts', { populate: '*' }),
      fetchAPI('/subscription'),
    ]);

  return {
    props: {
      categories,
      texts,
      subscription,
    },
    revalidate: 10,
  };
};

export default Texts;

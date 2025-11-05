import { Button } from "@/components/UI/Button";
import Typography from "@/components/UI/Typography";
import Link from "next/link";
import React from "react";

const privacyPolicy = {
  introduction:
    "با ورود یا ثبت‌نامه، به جمع کاربران خاص ما بپیوندید و از مزایای ویژه بهره‌مند شوید.",

  principles: [
    {
      id: 1,
      title: "Freedom of Opinion and Expression",
      content: "کاربران دارای آزادی عقیده و اندیشه و بیان هستند.",
    },
    {
      id: 2,
      title: "Privacy Protection",
      content:
        "حریم خصوصی کاربران باید همواره رعایت شود و اشخاص نسبت به حریم شخص خود مثل حمایت شوند و تجسس در گفتگوهای اشخاص علی الاصول ممنوع است.",
    },
    {
      id: 3,
      title: "Protection Against Ideological Changes",
      content:
        "تغییرات عقاید به هر دلیل و قصدی نسبت به کاربران ممنوع است و نباید بر اساس عقاید و باورها تبعیت نسبت به ایشان اعمال شود.",
    },
    {
      id: 4,
      title: "Equality Rights",
      content:
        "کاربران فارغ از جنسیت، زنان، قومیت، دیج و وضعیت اقتصادی و اجتماعی و جهت‌گیری سیاسی و سایر موارد تحت شمول حقوق شهروندی، دارای برابری هستند.",
    },
    {
      id: 5,
      title: "Right to Information",
      content: "دسترسی به اطلاعات و اخبار از حقوق شهروندی کاربران است.",
    },
    {
      id: 6,
      title: "Freedom of Association",
      content:
        "کاربران در تشخیص خطر و صلاح خویش و انتخاب مخاطبان‌دوستان‌گروه‌ها و محیط‌های خود آزاد هستند.",
    },
    {
      id: 7,
      title: "Political Participation Rights",
      content:
        "کاربران طبق قانون حق مشارکت در سرنوشت سیاسی، اقتصادی، اجتماعی و فرهنگی خود را به طور فردی و جمعی دارند و می‌توانند",
    },
  ],

  contact: {
    title: "شماره تماس",
    description: "09173400000",
  },

  actions: {
    verify: "تایید و ادامه",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className='min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-12'>
          <Typography type='h1' color='primary' className='mb-4'>
            سیاست حفظ حریم خصوصی
          </Typography>
          <div className='w-24 h-1 bg-blue-600 mx-auto rounded-full'></div>
        </div>

        {/* Introduction */}
        <section className='mb-12'>
          <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-8'>
            <Typography type='h3' color='primary' className='mb-6 text-right'>
              مقدمه
            </Typography>
            <Typography
              type='body1'
              color='secondary'
              align='right'
              className='leading-8'
            >
              {privacyPolicy.introduction}
            </Typography>
          </div>
        </section>

        {/* Principles */}
        <section className='mb-12'>
          <Typography type='h2' color='primary' className='mb-8 text-right'>
            اصول و قوانین
          </Typography>

          <div className='space-y-6'>
            {privacyPolicy.principles.map((principle, index) => (
              <div
                key={principle.id}
                className='bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-8 hover:shadow-md transition-shadow duration-300'
              >
                <div className='flex items-center gap-4'>
                  {/* Number Badge */}
                  <div className='shrink-0'>
                    <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center'>
                      <Typography
                        type='body1'
                        color='info'
                        className='font-semibold'
                      >
                        {index + 1}
                      </Typography>
                    </div>
                  </div>

                  {/* Content */}
                  <div className='flex-1'>
                    <Typography
                      type='body1'
                      color='secondary'
                      align='right'
                      className='leading-8'
                    >
                      {principle.content}
                    </Typography>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Information */}
        <section className='mb-12'>
          <div className='bg-gradient-to-l from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-8'>
            <Typography type='h3' color='primary' className='mb-4 text-right'>
              اطلاعات تماس
            </Typography>
            <Typography
              type='body1'
              color='secondary'
              align='right'
              className='mb-2'
            >
              {privacyPolicy.contact.title}
            </Typography>
            <Typography type='body2' color='lightGrey' align='right'>
              {privacyPolicy.contact.description}
            </Typography>
          </div>
        </section>

        {/* Action Button */}
        <section>
          <Link href={"/auth-user"}>
            <button type="button" className='flex bg-blue-600 hover:bg-blue-700 w-full justify-center items-center py-2 rounded-2xl text-center'>
              <Typography type='body1' color='white' align="center">
                {privacyPolicy.actions.verify}
              </Typography>
            </button>
          </Link>

          {/* Last Updated */}
          <div className='mt-8'>
            <Typography type='body3' color='lightGrey' align='center'>
              آخرین بروزرسانی: {new Date().toLocaleDateString("fa-IR")}
            </Typography>
          </div>
        </section>
      </div>
    </div>
  );
}

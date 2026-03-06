import { Icon } from '@iconify/react';

type Props = {
  dict: any;
};

export function MobileAppHomeScreen({ dict }: Props) {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Top bar */}
      <div className="bg-muted py-2 px-4">
        <span className="opacity-70">
          {dict.common.welcome}
        </span>
      </div>

      {/* Hero */}
      <section className="relative h-[500px]">
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 text-center text-white">
          <span className="bg-primary px-4 py-1 rounded-full">
            {dict.common.featured}
          </span>

          <h1 className="text-5xl font-bold mt-6">
            {dict.hero.title}{' '}
            <span className="text-primary">
              {dict.hero.highlight}
            </span>
          </h1>

          <p className="mt-4 max-w-xl mx-auto">
            {dict.hero.description}
          </p>

          <div className="flex justify-center gap-4 mt-6">
            <button className="bg-primary px-6 py-3 rounded">
              {dict.buttons.viewSpecialists}
            </button>
            <button className="border px-6 py-3 rounded">
              {dict.buttons.moreInfo}
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
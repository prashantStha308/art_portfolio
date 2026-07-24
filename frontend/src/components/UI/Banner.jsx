// eslint-disable-next-line react/prop-types
const Banner = ({ image }) => {
  return (
    <section className="relative isolate banner-container">
      <div
        className="bannerImg rounded-lg -z-10"
        style={{ backgroundImage: `url(${image})` }}
      />

      <div className="absolute inset-0 rounded-lg bg-gradient-to-bl from-pink-600/45 from-5% via-transparent to-transparent mix-blend-color-dodge" />

      <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-amber-600/45 from-5% via-transparent to-transparent mix-blend-color-dodge" />
    </section>
  );
};

export default Banner;
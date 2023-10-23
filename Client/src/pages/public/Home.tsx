import Image1 from '@/assets/images/image1.jpeg';
import Image2 from '@/assets/images/image2.jpeg';
import Image3 from '@/assets/images/image3.jpeg';
import Image4 from '@/assets/images/image4.jpeg';
import { CarouselOverlay } from '@/components/Carousels/CarouselOverlay';
import { HeroCarousel } from '@/components/Carousels/HeroCarousel';
import { HeroBadge } from '@/components/Template/Header/HeroBadge';
import { GhostButton } from '@/components/buttons/GhostButton';
import { EventCard } from '@/components/cards/EventCard';
import { NewCards } from '@/components/cards/NewCards';
import { WelcomeCard } from '@/components/cards/WelcomeCard';
import { ShortCutItem } from '@/components/others/ShortCutItem';
import { HeroCarouselItem } from '@/types/HeroCarouselItem';
import { New } from '@/types/NewType';
import { Grid } from '@mui/material';

const carouselItems: HeroCarouselItem[] = [
  {
    text: 'Esse duis nostrud anim aliqu nisi ullamco non ex quis.',
    textLink: 'Watch School Video',
    to: '#',
    iconLink: 'assets/images/play-icon.svg',
  },
  {
    text: 'Deserunt tempor nulla labore commodo.',
    textLink: 'Read More',
    to: '#',
  },
  {
    text: 'Consectetur aliqua quis voluptate et incididunt reprehenderit ipsum elit Lorem dolor dolore.',
    textLink: 'Read More',
    to: '#',
  },
  {
    text: 'Aliquip laborum cupidatat eu fugiat id esse irure reprehenderit nulla est minim ut cillum sunt.',
    textLink: 'Read More',
    to: '#',
  },
];

const news: New[] = [
  {
    title: 'School Concert',
    image: 'assets/images/news/news-1.jpg',
    intro:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis disparturient montes, nascetur ridiculus mus. Donec quam felis...',
    date: 'Thursday, 16th August 2017',
    paragraphs: [
      'Dolor culpa cupidatat adipisicing aliquip consectetur esse eiusmod voluptate laborum. Occaecat non ea do sit in qui et nulla. Consequat ad fugiat id ullamco exercitation elit. Proident id veniam commodo velit velit fugiat excepteur ea laboris sunt amet incididunt commodo.',
      'Nostrud esse cillum quis magna qui nulla exercitation. Consequat deserunt est est exercitation. Id dolore qui veniam ex cupidatat commodo sint excepteur nisi. Est eiusmod ut dolore officia esse est ullamco nulla amet amet tempor. Aliqua officia ea aliquip ex veniam consectetur. Excepteur aliqua mollit incididunt sunt occaecat Lorem. In sint ipsum aliquip minim aliqua nostrud mollit aliqua cupidatat nulla non pariatur veniam.',
    ],
    to: '#',
  },
  {
    title: 'Year 6 Sports Day',
    image: 'assets/images/news/news-2.jpg',
    intro:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis disparturient montes, nascetur ridiculus mus. Donec quam felis...',
    date: 'Thursday, 16th August 2017',
    paragraphs: [
      'Dolor culpa cupidatat adipisicing aliquip consectetur esse eiusmod voluptate laborum. Occaecat non ea do sit in qui et nulla. Consequat ad fugiat id ullamco exercitation elit. Proident id veniam commodo velit velit fugiat excepteur ea laboris sunt amet incididunt commodo.',
      'Nostrud esse cillum quis magna qui nulla exercitation. Consequat deserunt est est exercitation. Id dolore qui veniam ex cupidatat commodo sint excepteur nisi. Est eiusmod ut dolore officia esse est ullamco nulla amet amet tempor. Aliqua officia ea aliquip ex veniam consectetur. Excepteur aliqua mollit incididunt sunt occaecat Lorem. In sint ipsum aliquip minim aliqua nostrud mollit aliqua cupidatat nulla non pariatur veniam.',
    ],
    to: '#',
  },
  {
    title: 'ICT Week',
    image: 'assets/images/news/news-3.jpg',
    intro:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis disparturient montes, nascetur ridiculus mus. Donec quam felis...',
    date: 'Thursday, 16th August 2017',
    paragraphs: [
      'Dolor culpa cupidatat adipisicing aliquip consectetur esse eiusmod voluptate laborum. Occaecat non ea do sit in qui et nulla. Consequat ad fugiat id ullamco exercitation elit. Proident id veniam commodo velit velit fugiat excepteur ea laboris sunt amet incididunt commodo.',
      'Nostrud esse cillum quis magna qui nulla exercitation. Consequat deserunt est est exercitation. Id dolore qui veniam ex cupidatat commodo sint excepteur nisi. Est eiusmod ut dolore officia esse est ullamco nulla amet amet tempor. Aliqua officia ea aliquip ex veniam consectetur. Excepteur aliqua mollit incididunt sunt occaecat Lorem. In sint ipsum aliquip minim aliqua nostrud mollit aliqua cupidatat nulla non pariatur veniam.',
    ],
    to: '#',
  },
];

const Home = () => {
  return (
    <div className="home-page has-hero">
      <section className="promo-section section section-on-bg">
        <HeroCarousel items={carouselItems} />

        <CarouselOverlay />

        <HeroBadge text="Open day" date="2026" to="/admissions" />
      </section>

      <div className="home-cols-wrapper">
        <div className="container">
          <div className="row">
            <section className="col-main col-12 col-lg-8">
              <Grid container spacing={2} mb={8}>
                <WelcomeCard
                  title="Bienvenido a Mundo Lingua"
                  subtitle="Elige nuestro curso online para adultos"
                  description="Llevamos enseñando Inglés desde 2002 utilizando un
                            método que garantiza resultados. Hemos desarrollado
                            un curso de Inglés online específico para adultos
                            que les permitirá desarrollar la confianza que
                            necesitan para la universidad, desarrollo
                            profesional o en su puesto de trabajo. Aprenderá
                            Inglés en clases dirigidas por un profesor de manera
                            individualizada que permitirà que adquieras este
                            nuevo idioma de una manera ràpida y eficaz."
                  image={Image1}
                  grid={[12, 12]}
                />
                <WelcomeCard
                  title="Experiencia"
                  subtitle=""
                  description="El 90% de nuestros estudiantes afirman que ahora logran sus objetivos de aprendizaje.
Por ello, más de 3 mil de estudiantes han estudiado Inglés con nostros en los últimos 20 años."
                  image={Image4}
                  grid={[12, 6]}
                />
                <WelcomeCard
                  title="Seguimiento Personalizado"
                  subtitle=""
                  description="Los coaches personales te darán apoyo.
Te mantendremos al día con el progreso de tu aprendizaje y con informes de progreso regulares sobre las diferentes habilidades de aprendizaje."
                  image={Image2}
                  grid={[12, 6]}
                />
                <WelcomeCard
                  title="Resultados Garantizados"
                  description="Nuestra probada metodología es impartida por profesores nativos de Inglés y Mèxico Americanos titulados.
¡8 de cada 10 de nuestros estudiantes consideran que Mundo Lingua es la mejor solución de aprendizaje que han probado!
Conoce al equipo de apoyo"
                  image={Image1}
                  grid={[12, 12]}
                />
                <WelcomeCard
                  title="Conoce a tu coach"
                  description="Tu Coach de Inglés te mantendrá motivado aprendiendo Inglés.
Ellos se asegurarán de seguir el plan de estudio y progresar en el aprendizaje.
Establecerán tus objetivos de aprendizaje con tu coach para conseguir los resultados que necesita."
                  image={Image3}
                />
                <WelcomeCard
                  title="Conoce a tu profesor"
                  description="Tu profesor online se asegurará que dominas el Inglés necesario para progresar.
Un profesor de Inglés altamente cualificado con experiencia en aprendizaje online."
                  image={Image3}
                  grid={[12, 6]}
                />
              </Grid>

              <div className="news-block block">
                <h3 className="block-title">Latest News</h3>
                <NewCards news={news} />
              </div>
            </section>
            <aside className="col-side col-12 col-lg-4">
              <div className="shortcuts-block block">
                <ShortCutItem
                  className="item tbg-accent"
                  icon="fas fa-download"
                  to="#"
                  title="Download Prospectus"
                />

                <ShortCutItem
                  className="item tbg-dark"
                  icon="fas fa-eye"
                  to="#"
                  title="Open Day 2026"
                />
                <ShortCutItem
                  className="item tbg-primary"
                  icon="fas fa-binoculars"
                  to="#"
                  title="Virtual Tour"
                />
                <ShortCutItem
                  className="item tbg-secondary"
                  icon="fas fa-images"
                  to="#"
                  title="Photo Gallery"
                />
              </div>
              <div className="events-block block">
                <h3 className="block-title">Upcoming Events</h3>
                <div className="events-items">
                  <EventCard
                    day="26"
                    month="Jan"
                    title="Open Evening"
                    description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor..."
                  />

                  <EventCard
                    day="07"
                    month="Dec"
                    title="Drama Workshop"
                    description="Lorem ipsum dolor sit amet consectetuer adipiscing elit. Aenean commodo ligula eget dolor..."
                  />

                  <EventCard
                    day="20"
                    month="Nov"
                    title="Science Day"
                    description="Lorem ipsum dolor sit amet consectetuer adipiscing elit. Aenean commodo ligula eget dolor..."
                  />

                  <GhostButton
                    title="View Calendar"
                    to="/calendar"
                    align="text-center"
                  />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

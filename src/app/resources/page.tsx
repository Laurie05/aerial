export default function ResourcesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-silk-500 to-aerial-500 bg-clip-text text-transparent mb-8">
        Resources
      </h1>

      {/* Retreats & Intensives */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Retreats & Intensives
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <ResourceCard
            title="Casa Chango"
            description="Aerial retreat in Mexico offering immersive training in a tropical setting. Multi-day programs with international instructors."
            url="https://casachangomexico.com/"
          />
          <ResourceCard
            title="NECCA Summer Intensive"
            description="New England Center for Circus Arts offers intensive summer programs covering silks, trapeze, lyra, and more in Brattleboro, Vermont."
            url="https://necenterforcircusarts.org"
          />
          <ResourceCard
            title="Vixen DeVille Retreat"
            description="Aerial retreat based in Palm Springs, California. Focused training with small group sizes."
            url="https://www.vixendeville.com/retreat/"
          />
          <ResourceCard
            title="BLOOM Aerial Lab"
            description="Aerial training lab in Utah run by Holly Ann Jarvis, focused on aerial arts development and creative exploration."
            url="https://bloomdanceutah.as.me/schedule/5ed1e084/?categories[]=Private%20Lessons"
          />
        </div>
      </section>

      {/* Studio Directories */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Studio Directories
        </h2>
        <div className="grid gap-4">
          <ResourceCard
            title="Aerial Arts Map"
            description="Worldwide interactive map of aerial and pole studios. Coverage varies by region — strong in Western countries, less complete in Asia."
            url="https://www.google.com/maps/d/u/0/embed?mid=1OMF1pQJ_bsvguXLkPVgoF1ETYKYKuHk&ehbc=2E312F&ll=18.74340597547492%2C168.5941131&z=2"
          />
        </div>
      </section>

      {/* Conditioning & Progressions */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Conditioning & Progressions
        </h2>
        <div className="grid gap-4">
          <ResourceCard
            title="Bodyweight Fitness Progressions"
            description="Community-built Google Sheet mapping out bodyweight fitness progressions with links for each skill. Copy it to track your own progress by shading completed exercises — great for building the strength foundation needed for aerial."
            url="https://docs.google.com/spreadsheets/d/1a8tlZ-zbF695HA3Lmm20OIYeYYxo1lmUOczUXKLoL4s/edit?gid=1833143925#gid=1833143925"
          />
        </div>
      </section>

      {/* Scoring & Technique Reference */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Scoring & Technique Reference
        </h2>
        <div className="grid gap-4">
          <ResourceCard
            title="POSA Code of Points"
            description="Pole & Aerial Sports Association scoring reference. Categorizes aerial moves into flexibility, strength, balance, and dynamic categories across lyra, silks, and other apparatus. Useful for understanding technique difficulty levels and identifying training gaps."
            url="https://www.posaworld.org/documents/download-category/cop/"
          />
        </div>
      </section>

      {/* Podcasts & Media */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Podcasts & Media
        </h2>
        <div className="grid gap-4">
          <ResourceCard
            title="Aerial Evolution Podcast"
            description="Podcast featuring interviews with aerial instructors and performers. Covers aerial arts history, training philosophy, and personal stories from the community. Great listening during cardio or commutes."
            url="https://www.aerialevolutionpod.com/"
          />
        </div>
      </section>
    </div>
  );
}

function ResourceCard({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url?: string;
}) {
  const content = (
    <div className="bg-white border border-purple-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow h-full">
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      {url && (
        <span className="text-xs text-aerial-500 mt-3 inline-block">
          Visit site &rarr;
        </span>
      )}
    </div>
  );

  if (url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}

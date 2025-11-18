import {Link, useLocation} from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const tabs = [
    {label: 'Search', path: '/'},
    {label: 'Favorites', path: '/favorites'},
  ];

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className="bg-white dark:bg-slate-900 shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              MovieApp
            </h1>
            <div className="flex space-x-4">
              {tabs.map((tab) => {
                const isActive = location.pathname === tab.path;
                return (
                  <Link
                    key={tab.path}
                    to={tab.path}
                    aria-current={isActive ? 'page' : undefined}
                    className={`px-3 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isActive
                        ? 'bg-blue-500 text-white'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-800'
                    }`}
                  >
                    {tab.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

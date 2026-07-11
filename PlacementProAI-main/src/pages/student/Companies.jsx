import { useState } from 'react';
import { companies } from '../../mockData';
import { Building2, Search, ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '../../components/Button';
import { BadgePill } from '../../components/BadgePill';

export function Companies() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredCompanies = companies.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-surface p-6 rounded-xl border border-border shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-1">Company Preparation</h2>
          <p className="text-text-secondary">Targeted practice for your dream companies.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
          <input 
            type="text" 
            placeholder="Search companies..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-surface-alt border border-border rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCompanies.map((company) => (
          <div key={company.id} className="bg-surface border border-border rounded-xl p-5 shadow-sm hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-surface-alt border border-border flex items-center justify-center p-2 overflow-hidden">
                <img 
                  src={company.logo} 
                  alt={company.name} 
                  className="w-full h-full object-contain mix-blend-multiply" 
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=' + company.name; }}
                />
              </div>
              <BadgePill variant={company.difficulty === 'Moderate' ? 'warning' : company.difficulty === 'Hard' ? 'danger' : company.difficulty === 'Very Hard' ? 'danger' : 'primary'}>
                {company.difficulty}
              </BadgePill>
            </div>
            
            <h3 className="font-bold text-lg text-text-primary mb-1">{company.name}</h3>
            <p className="text-sm text-text-secondary mb-4 line-clamp-2">{company.hiringMode}</p>
            
            <div className="mt-auto space-y-4 border-t border-border pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Avg Package</span>
                <span className="font-semibold text-text-primary">{company.package}</span>
              </div>
              <Button className="w-full group-hover:bg-primary group-hover:text-white transition-colors" variant="outline">
                Prepare Now <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        ))}
        {filteredCompanies.length === 0 && (
          <div className="col-span-full py-12 text-center text-text-secondary">
            No companies found matching "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
}

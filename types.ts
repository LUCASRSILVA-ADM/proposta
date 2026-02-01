
export interface GapItem {
  id: string;
  title: string;
  description: string;
  impact: string;
  icon: string;
}

export interface PortfolioItem {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  features: string[];
}

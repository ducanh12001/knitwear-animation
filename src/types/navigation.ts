export interface MenuLink {
  label: string;
  path: string;
}

export interface FooterLink {
  label: string;
  path: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterFormErrors {
  empty: boolean;
  invalid: boolean;
  exists: boolean;
}

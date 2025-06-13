import React from "react";
import { FOOTER } from "../../../constants/footer";

interface FooterColumn {
  title: string;
  items: string[];
}

interface FooterColumnsProps {
  columns: FooterColumn[];
}

const FooterColumns: React.FC<FooterColumnsProps> = ({ columns }) => (
  <div className="flex gap-[120px]">
    {columns.map((col, idx) => (
      <div key={idx}>
        <div className="font-semibold text-white mb-4">{col.title}</div>
        <ul className="list-none p-0 m-0">
          {col.items.map((item, i) => (
            <li key={i} className="text-gray-400 mb-2.5">
              <a
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

export const HomeFooter = () => {
  return (
    <footer className="bg-black pt-12 px-[70px]">
      <div className="flex justify-between items-start">
        <FooterColumns columns={FOOTER} />
        <div className="min-w-[300px] ml-16">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center font-bold text-gray-900 text-lg mr-2.5">
              N
            </div>
            <span className="font-semibold text-white text-lg">Nexora</span>
          </div>
          <div className="text-gray-400 text-base mb-4">Get latest updates</div>
          <input
            type="email"
            placeholder="Your email"
            className="w-full px-4 py-2.5 rounded-full border border-gray-400 bg-[#111] text-white outline-none text-base placeholder:text-gray-300"
          />
        </div>
      </div>
      <div className="text-center text-gray-400 text-base py-[40px]">
        Copyright © 2025 Nexora. All rights reserved.
      </div>
    </footer>
  );
};

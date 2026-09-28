'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { ShieldCheck, Phone, Mail, ExternalLink, Building, Lock } from 'lucide-react';

export function GovernmentFooter() {
  const { language } = useApp();
  const isMr = language === 'mr';

  return (
    <footer className="mt-auto bg-[#0a192f] text-slate-300 border-t-2 border-amber-500/80 text-xs select-none">
      {/* Top Links & Department Partners */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 border-b border-slate-800">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-2.5 flex items-center gap-1.5">
              <Building size={14} className="text-amber-400" />
              <span>{isMr ? 'महाराष्ट्र कौशल्य परिसंस्था' : 'State Skill Ecosystem'}</span>
            </h4>
            <ul className="space-y-1.5 text-[11px] text-slate-400">
              <li>
                <a href="https://dvet.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-300 flex items-center gap-1">
                  <span>{isMr ? 'व्यवसाय शिक्षण व प्रशिक्षण संचालनालय (DVET)' : 'DVET Maharashtra'}</span>
                  <ExternalLink size={10} />
                </a>
              </li>
              <li>
                <a href="https://mssds.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-300 flex items-center gap-1">
                  <span>{isMr ? 'महाराष्ट्र राज्य कौशल्य विकास संस्था (MSSDS)' : 'MSSDS Schemes'}</span>
                  <ExternalLink size={10} />
                </a>
              </li>
              <li>
                <a href="https://mahaswayam.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-300 flex items-center gap-1">
                  <span>{isMr ? 'महास्वयं रोजगार पोर्टल' : 'MahaSwayam Portal'}</span>
                  <ExternalLink size={10} />
                </a>
              </li>
              <li>
                <a href="https://aaplesarkar.mahaonline.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-300 flex items-center gap-1">
                  <span>{isMr ? 'आपले सरकार नागरिक सेवा' : 'Aaple Sarkar Citizen Services'}</span>
                  <ExternalLink size={10} />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-2.5">
              {isMr ? 'राष्ट्रीय संलग्नता' : 'National Alignments'}
            </h4>
            <ul className="space-y-1.5 text-[11px] text-slate-400">
              <li>
                <a href="https://skillindiadigital.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-300 flex items-center gap-1">
                  <span>{isMr ? 'कौशल्य भारत डिजिटल केंद्र (SIDH)' : 'Skill India Digital Hub'}</span>
                  <ExternalLink size={10} />
                </a>
              </li>
              <li>
                <a href="https://ncs.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-300 flex items-center gap-1">
                  <span>{isMr ? 'राष्ट्रीय कारकीर्द सेवा (NCS)' : 'National Career Service (NCS)'}</span>
                  <ExternalLink size={10} />
                </a>
              </li>
              <li>
                <a href="https://digilocker.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-300 flex items-center gap-1">
                  <span>{isMr ? 'डिजिलॉकर NCVT नोंदवही' : 'DigiLocker NCVT Registry'}</span>
                  <ExternalLink size={10} />
                </a>
              </li>
              <li>
                <a href="https://epfindia.gov.in" target="_blank" rel="noreferrer" className="hover:text-amber-300 flex items-center gap-1">
                  <span>{isMr ? 'EPFO रोजगार पडताळणी' : 'EPFO Employment Verification'}</span>
                  <ExternalLink size={10} />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-2.5">
              {isMr ? 'वैधानिक व अनुपालन' : 'Statutory & Compliance'}
            </h4>
            <ul className="space-y-1.5 text-[11px] text-slate-400">
              <li>
                <Link href="/government/data-quality" className="hover:text-amber-300">
                  {isMr ? 'माहिती प्रशासन व सायबर सुरक्षा' : 'Data Governance & Security'}
                </Link>
              </li>
              <li>
                <Link href="/government/reports" className="hover:text-amber-300">
                  {isMr ? 'सार्वजनिक लेखापरीक्षण व निकाल' : 'Public Audit & Performance'}
                </Link>
              </li>
              <li>
                <span className="text-slate-400">
                  {isMr ? 'माहिती अधिकार कायदा २००५ (RTI)' : 'RTI Act 2005 Compliance'}
                </span>
              </li>
              <li>
                <span className="text-slate-400">
                  {isMr ? 'ISO २७००१ / CERT-In प्रमाणित' : 'ISO 27001 / CERT-In Audited'}
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-2.5">
              {isMr ? 'नागरिक व अधिकारी मदत कक्ष' : 'Citizen & Officer Helpdesk'}
            </h4>
            <div className="space-y-2 text-[11px]">
              <div className="flex items-center gap-2 text-slate-300">
                <Phone size={13} className="text-amber-400 shrink-0" />
                <span>
                  {isMr ? 'टोल-फ्री क्रमांक:' : 'Toll-Free:'} <strong>1800-120-8040</strong>
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail size={13} className="text-amber-400 shrink-0" />
                <span>disha-support@maharashtra.gov.in</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                {isMr
                  ? 'कामकाजाची वेळ: सकाळी ०९:३० ते संध्याकाळी ०६:०० (सोमवार ते शनिवार, शासकीय सुट्ट्या वगळून)'
                  : 'Working Hours: 09:30 AM to 06:00 PM (Monday to Saturday, except Public Holidays)'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Official Government Disclaimer and NIC Attribution */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] text-slate-400">
        <div>
          <p className="text-slate-300 font-semibold">
            {isMr
              ? '© २०२६ महाराष्ट्र शासन. सर्व हक्क राखीव.'
              : '© 2026 Government of Maharashtra. All rights reserved.'}
          </p>
          <p className="mt-0.5">
            {isMr
              ? 'कौशल्य विकास, रोजगार, उद्योजकता व नाविन्यता विभाग, महाराष्ट्र शासन. राष्ट्रीय सूचना-विज्ञान केंद्र (NIC) द्वारे विकसित व होस्ट केलेले.'
              : 'Content Owned, Maintained and Updated by Department of Skills, Employment, Entrepreneurship & Innovation. Hosted by National Informatics Centre (NIC).'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1 text-emerald-400">
            <Lock size={10} /> {isMr ? '२५६-बिट एसएसएल सुरक्षित' : '256-Bit SSL Encrypted'}
          </span>
          <span>•</span>
          <span>{isMr ? 'GIGW ३.० सुलभता प्रमाणन' : 'GIGW 3.0 Accessible'}</span>
          <span>•</span>
          <span className="text-amber-400 font-mono">Node: MH-MUM-PROD-01</span>
        </div>
      </div>
    </footer>
  );
}

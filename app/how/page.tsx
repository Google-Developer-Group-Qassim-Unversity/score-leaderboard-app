"use client"

import React from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Award, Users, Building2, Calendar, Star, Check } from "lucide-react";
import { useTranslation } from 'react-i18next';
import '@/lib/i18n-client';

export default function PointsSystemPage() {
  const { t, i18n } = useTranslation();
  const rtl = i18n.language === 'ar';

  const memberPoints = [
    { actionKey: "how.memberAction.0", points: "6" },
    { actionKey: "how.memberAction.1", points: "4" },
    { actionKey: "how.memberAction.2", points: "10" },
    { actionKey: "how.memberAction.3", points: "6" },
    { actionKey: "how.memberAction.4", points: "15" },
    { actionKey: "how.memberAction.5", points: "3" },
    { actionKey: "how.memberAction.6", points: "6" },
    { actionKey: "how.memberAction.7", points: "12" },
    { actionKey: "how.memberAction.8", points: "18" },
    { actionKey: "how.memberAction.9", points: "8" },
    { actionKey: "how.memberAction.10", points: "20" },
    { actionKey: "how.memberAction.11", points: "5/شفت" },
    { actionKey: "how.memberAction.12", points: "6" },
    { actionKey: "how.memberAction.13", points: "10" },
    { actionKey: "how.memberAction.14", points: "10" },
  ];

  const departmentPoints = [
    { typeKey: "how.deptType.0", descKey: "how.deptDesc.0", points: "15" },
    { typeKey: "how.deptType.1", descKey: "how.deptDesc.1", points: "9" },
    { typeKey: "how.deptType.2", descKey: "how.deptDesc.2", points: "20/يوم" },
    { typeKey: "how.deptType.3", descKey: "how.deptDesc.3", points: "13/يوم" },
    { typeKey: "how.deptType.4", descKey: "how.deptDesc.4", points: "50+" },
    { typeKey: "how.deptType.5", descKey: "how.deptDesc.5", points: "7" },
    { typeKey: "how.deptType.6", descKey: "how.deptDesc.6", points: "6" },
    { typeKey: "how.deptType.7", descKey: "how.deptDesc.7", points: "12" },
    { typeKey: "how.deptType.8", descKey: "how.deptDesc.8", points: "10" },
    { typeKey: "how.deptType.9", descKey: "how.deptDesc.9", points: "20" },
    { typeKey: "how.deptType.10", descKey: "how.deptDesc.10", points: "8" },
    { typeKey: "how.deptType.11", descKey: "how.deptDesc.11", points: "15-30" },
    { typeKey: "how.deptType.12", descKey: "how.deptDesc.12", points: "10" },
  ];

  return (
    <div dir={rtl ? 'rtl' : 'ltr'} className={`min-h-screen bg-white text-slate-800 ${rtl ? 'rtl' : 'ltr'}`}>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center flex-col md:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-500 rounded-lg flex items-center justify-center">
              <Award className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
              {t('how.title')}
            </h1>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t('how.subtitle')}
          </p>
        </div>

        {/* General Idea Section */}
        <div className="bg-white rounded-lg p-4 sm:p-8 border border-slate-200 mb-6 sm:mb-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className={`text-xl sm:text-2xl font-bold text-slate-900 inline-flex items-center gap-2 sm:gap-3 ${!rtl ? 'flex-row-reverse' : ''}`}>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              {t('how.generalIdea')}
            </h2>
          </div>

          <p className="text-slate-600 text-base leading-relaxed text-center mb-8 max-w-3xl mx-auto">
            {t('how.generalIdea.desc')}
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            {/* Monthly Recognition */}
            <Card className="bg-white border border-slate-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className={`text-slate-900 flex items-center gap-3 text-lg font-bold justify-center ${!rtl ? 'flex-row-reverse' : ''}`}>
                  <span className="flex items-center gap-2 justify-center w-full">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <span className="text-center">{t('how.monthly')}</span>
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-slate-50 rounded-lg px-4 py-3 border border-slate-200">
                  <p className="text-slate-700 text-sm text-center">{t('how.monthly.topMembers')}</p>
                </div>
                <div className="bg-slate-50 rounded-lg px-4 py-3 border border-slate-200">
                  <p className="text-slate-700 text-sm text-center">{t('how.monthly.topDept')}</p>
                </div>
              </CardContent>
            </Card>

            {/* Term Recognition */}
            <Card className="bg-white border border-slate-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className={`text-slate-900 flex items-center gap-3 text-lg font-bold justify-center ${!rtl ? 'flex-row-reverse' : ''}`}>
                  <span className="flex items-center gap-2 justify-center w-full">
                    <Star className="h-5 w-5 text-yellow-600" />
                    <span className="text-center">{t('how.endOfTerm')}</span>
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-slate-50 rounded-lg px-4 py-3 border border-slate-200">
                  <p className="text-slate-700 text-sm text-center">{t('how.endOfTerm.top5')}</p>
                </div>
                <div className="bg-slate-50 rounded-lg px-4 py-3 border border-slate-200">
                  <p className="text-slate-700 text-sm text-center">{t('how.endOfTerm.specialized')}</p>
                </div>
                <div className="bg-slate-50 rounded-lg px-4 py-3 border border-slate-200">
                  <p className="text-slate-700 text-sm text-center">{t('how.endOfTerm.administrative')}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            <div className="flex items-center gap-3 bg-slate-50 rounded-lg px-4 py-3 border border-slate-200">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="h-3 w-3 text-white" />
              </div>
              <span className="text-slate-700 text-sm">{t('how.note.multipliers')}</span>
            </div>
            <div className="flex items-center gap-3 bg-slate-50 rounded-lg px-4 py-3 border border-slate-200">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="h-3 w-3 text-white" />
              </div>
              <span className="text-slate-700 text-sm">{t('how.note.bothTypes')}</span>
            </div>
          </div>
        </div>

        {/* Members Points Section */}
        <div className="bg-white rounded-lg p-4 sm:p-8 border border-slate-200 mb-6 sm:mb-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className={`text-xl sm:text-2xl font-bold text-slate-900 inline-flex items-center gap-2 sm:gap-3 ${!rtl ? 'flex-row-reverse' : ''}`}>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              {t('how.memberPoints')}
            </h2>
            <p className="text-slate-600 mt-2 text-sm sm:text-base">{t('how.memberPoints.subtitle')}</p>
          </div>

          {/* Mobile: Card layout */}
          <div className="sm:hidden space-y-3">
            {memberPoints.map((item, index) => (
              <div key={index} className="bg-slate-50 rounded-lg p-4 border border-slate-200 flex items-center justify-between gap-3">
                <span className="text-slate-700 text-sm flex-1">{t(item.actionKey)}</span>
                <span className="inline-flex items-center justify-center px-3 py-1 bg-green-100 text-green-800 font-bold text-sm rounded-lg min-w-[50px]">
                  {item.points}
                </span>
              </div>
            ))}
          </div>

          {/* Desktop: Table layout */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700 text-right">{t('how.tableHeader.action')}</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700 text-center">{t('how.tableHeader.points')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {memberPoints.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-slate-700 text-sm">{t(item.actionKey)}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center px-3 py-1 bg-green-100 text-green-800 font-bold text-sm rounded-lg min-w-[60px]">
                        {item.points}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Department Activities Section */}
        <div className="bg-white rounded-lg p-4 sm:p-8 border border-slate-200">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className={`text-xl sm:text-2xl font-bold text-slate-900 inline-flex items-center gap-2 sm:gap-3 ${!rtl ? 'flex-row-reverse' : ''}`}>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              {t('how.deptPoints')}
            </h2>
            <p className="text-slate-600 mt-2 text-sm sm:text-base">{t('how.deptPoints.subtitle')}</p>
          </div>

          {/* Mobile: Card layout */}
          <div className="sm:hidden space-y-3">
            {departmentPoints.map((item, index) => (
              <div key={index} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="text-slate-900 text-sm font-medium flex-1">{t(item.typeKey)}</span>
                  <span className="inline-flex items-center justify-center px-3 py-1 bg-yellow-100 text-yellow-800 font-bold text-sm rounded-lg min-w-[50px]">
                    {item.points}
                  </span>
                </div>
                <p className="text-slate-500 text-xs">{t(item.descKey)}</p>
              </div>
            ))}
          </div>

          {/* Desktop: Table layout */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700 text-right">{t('how.tableHeader.type')}</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700 text-right">{t('how.tableHeader.definition')}</th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700 text-center">{t('how.tableHeader.points')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {departmentPoints.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-slate-700 text-sm font-medium whitespace-nowrap">{t(item.typeKey)}</td>
                    <td className="px-6 py-4 text-slate-500 text-sm">{t(item.descKey)}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center px-3 py-1 bg-yellow-100 text-yellow-800 font-bold text-sm rounded-lg min-w-[60px]">
                        {item.points}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

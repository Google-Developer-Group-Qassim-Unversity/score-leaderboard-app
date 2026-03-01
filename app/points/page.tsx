"use client"

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Users, Building2, Calendar, Star, Check, Loader2 } from "lucide-react";
import { useTranslation } from 'react-i18next';
import '@/lib/i18n-client';
import { fetchActions } from '@/lib/api';
import type { ApiAction } from '@/lib/api-types';

interface ActionItem {
  id: number
  action_name: string
  ar_action_name: string
  points: number
}

export default function PointsPage() {
  const { i18n } = useTranslation();
  const rtl = i18n.language === 'ar';
  const [memberActions, setMemberActions] = useState<ActionItem[]>([]);
  const [departmentActions, setDepartmentActions] = useState<ActionItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadActions() {
      try {
        const data = await fetchActions();
        
        const filtered = data.filter(
          (action) => action.action_type !== "bonus" && action.points > 0
        );

        const memberList: ActionItem[] = [];
        const departmentList: ActionItem[] = [];

        filtered.forEach((action) => {
          if (action.action_type === "member") {
            memberList.push({
              id: action.id,
              action_name: action.action_name,
              ar_action_name: action.ar_action_name,
              points: action.points,
            });
          } else if (action.action_type === "department") {
            departmentList.push({
              id: action.id,
              action_name: action.action_name,
              ar_action_name: action.ar_action_name,
              points: action.points,
            });
          } else if (action.action_type === "composite") {
            const isAttendance =
              action.action_name.toLowerCase().includes("attendance") ||
              action.ar_action_name.includes("حضور");
            
            const item: ActionItem = {
              id: action.id,
              action_name: action.action_name,
              ar_action_name: action.ar_action_name,
              points: action.points,
            };

            if (isAttendance) {
              memberList.push(item);
            } else {
              departmentList.push(item);
            }
          }
        });

        setMemberActions(memberList);
        setDepartmentActions(departmentList);
      } catch (error) {
        console.error("Failed to load actions:", error);
      } finally {
        setLoading(false);
      }
    }

    loadActions();
  }, []);

  const getActionName = (action: ActionItem) => {
    return rtl ? action.ar_action_name : action.action_name;
  };

  const formatPoints = (points: number) => {
    return points.toString();
  };

  if (loading) {
    return (
      <div dir={rtl ? 'rtl' : 'ltr'} className={`min-h-screen bg-white text-slate-800 ${rtl ? 'rtl' : 'ltr'}`}>
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div dir={rtl ? 'rtl' : 'ltr'} className={`min-h-screen bg-white text-slate-800 ${rtl ? 'rtl' : 'ltr'}`}>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center flex-col md:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-500 rounded-lg flex items-center justify-center">
              <Award className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
              {rtl ? "نظام التقييم والمتابعة للنقاط" : "Points Evaluation and Tracking System"}
            </h1>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {rtl ? "لمجموعة قوقل للطلبة المطورين" : "Google Developer Groups on Campus"}
          </p>
        </div>

        <div className="bg-white rounded-lg p-4 sm:p-8 border border-slate-200 mb-6 sm:mb-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className={`text-xl sm:text-2xl font-bold text-slate-900 inline-flex items-center gap-2 sm:gap-3 ${!rtl ? 'flex-row-reverse' : ''}`}>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Star className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              {rtl ? "الفكرة العامة" : "General Idea"}
            </h2>
          </div>

          <p className="text-slate-600 text-base leading-relaxed text-center mb-8 max-w-3xl mx-auto">
            {rtl 
              ? "نقاط قوقل تعكس مساهمات الأعضاء والأقسام، حيث يتم تقدير كل جهد وإنجاز بشكل واضح وملموس. مشاركتك معنا تصنع الفرق، وكل عضو له دور فريد وبصمة خاصة."
              : "GDG points reflect member and department contributions, where every effort and achievement is appreciated clearly and tangibly. Your participation makes a difference, and every member has a unique role and special mark."
            }
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            <Card className="bg-white border border-slate-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className={`text-slate-900 flex items-center gap-3 text-lg font-bold justify-center ${!rtl ? 'flex-row-reverse' : ''}`}>
                  <span className="flex items-center gap-2 justify-center w-full">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <span className="text-center">{rtl ? "شهرياً" : "Monthly"}</span>
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-slate-50 rounded-lg px-4 py-3 border border-slate-200">
                  <p className="text-slate-700 text-sm text-center">
                    {rtl ? "ثلاث أعضاء الشهر المميزين" : "Three Members of the Month"}
                  </p>
                </div>
                <div className="bg-slate-50 rounded-lg px-4 py-3 border border-slate-200">
                  <p className="text-slate-700 text-sm text-center">
                    {rtl ? "قسم الشهر المبدع" : "Creative Department of the Month"}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-slate-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className={`text-slate-900 flex items-center gap-3 text-lg font-bold justify-center ${!rtl ? 'flex-row-reverse' : ''}`}>
                  <span className="flex items-center gap-2 justify-center w-full">
                    <Star className="h-5 w-5 text-yellow-600" />
                    <span className="text-center">{rtl ? "نهاية الفصل" : "End of Term"}</span>
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-slate-50 rounded-lg px-4 py-3 border border-slate-200">
                  <p className="text-slate-700 text-sm text-center">
                    {rtl ? "تكريم أفضل 5 أعضاء (قابلة للزيادة إلى 10)" : "Top 5 members honored (up to 10)"}
                  </p>
                </div>
                <div className="bg-slate-50 rounded-lg px-4 py-3 border border-slate-200">
                  <p className="text-slate-700 text-sm text-center">
                    {rtl ? "تكريم القسم التخصصي المتميز" : "Outstanding Specialized Department"}
                  </p>
                </div>
                <div className="bg-slate-50 rounded-lg px-4 py-3 border border-slate-200">
                  <p className="text-slate-700 text-sm text-center">
                    {rtl ? "تكريم القسم الإداري المتميز" : "Outstanding Administrative Department"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            <div className="flex items-center gap-3 bg-slate-50 rounded-lg px-4 py-3 border border-slate-200">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="h-3 w-3 text-white" />
              </div>
              <span className="text-slate-700 text-sm">
                {rtl 
                  ? "كل نشاط له نقاط أساسية + مضاعفات (حسب الحضور والجودة والتزام الوقت… إلخ)."
                  : "Each activity has base points + multipliers (based on attendance, quality, timeliness, etc.)."
                }
              </span>
            </div>
            <div className="flex items-center gap-3 bg-slate-50 rounded-lg px-4 py-3 border border-slate-200">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="h-3 w-3 text-white" />
              </div>
              <span className="text-slate-700 text-sm">
                {rtl 
                  ? "فيه نقاط للأقسام (نقاط قسم) وفيه نقاط للأعضاء (نقاط عضو)."
                  : "There are points for departments (department points) and points for members (member points)."
                }
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 sm:p-8 border border-slate-200 mb-6 sm:mb-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className={`text-xl sm:text-2xl font-bold text-slate-900 inline-flex items-center gap-2 sm:gap-3 ${!rtl ? 'flex-row-reverse' : ''}`}>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              {rtl ? "نقاط الأعضاء" : "Member Points"}
            </h2>
            <p className="text-slate-600 mt-2 text-sm sm:text-base">
              {rtl ? "حضور / مشاركة / تنظيم" : "Attendance / Participation / Organization"}
            </p>
          </div>

          <div className="sm:hidden space-y-3">
            {memberActions.map((item) => (
              <div key={item.id} className="bg-slate-50 rounded-lg p-4 border border-slate-200 flex items-center justify-between gap-3">
                <span className="text-slate-700 text-sm flex-1">{getActionName(item)}</span>
                <span className="inline-flex items-center justify-center px-3 py-1 bg-green-100 text-green-800 font-bold text-sm rounded-lg min-w-[50px]">
                  {formatPoints(item.points)}
                </span>
              </div>
            ))}
          </div>

          <div className="hidden sm:block overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700 text-right">
                    {rtl ? "الفعل" : "Action"}
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700 text-center">
                    {rtl ? "النقاط" : "Points"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {memberActions.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-slate-700 text-sm">{getActionName(item)}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center px-3 py-1 bg-green-100 text-green-800 font-bold text-sm rounded-lg min-w-[60px]">
                        {formatPoints(item.points)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 sm:p-8 border border-slate-200">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className={`text-xl sm:text-2xl font-bold text-slate-900 inline-flex items-center gap-2 sm:gap-3 ${!rtl ? 'flex-row-reverse' : ''}`}>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              {rtl ? "نقاط الأقسام" : "Department Points"}
            </h2>
            <p className="text-slate-600 mt-2 text-sm sm:text-base">
              {rtl ? "أنواع الأنشطة والنقاط الأساسية" : "Activity Types and Base Points"}
            </p>
          </div>

          <div className="sm:hidden space-y-3">
            {departmentActions.map((item) => (
              <div key={item.id} className="bg-slate-50 rounded-lg p-4 border border-slate-200 flex items-center justify-between gap-3">
                <span className="text-slate-700 text-sm flex-1">{getActionName(item)}</span>
                <span className="inline-flex items-center justify-center px-3 py-1 bg-yellow-100 text-yellow-800 font-bold text-sm rounded-lg min-w-[50px]">
                  {formatPoints(item.points)}
                </span>
              </div>
            ))}
          </div>

          <div className="hidden sm:block overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700 text-right">
                    {rtl ? "النوع" : "Type"}
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-700 text-center">
                    {rtl ? "النقاط" : "Points"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {departmentActions.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-slate-700 text-sm font-medium whitespace-nowrap">
                      {getActionName(item)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center px-3 py-1 bg-yellow-100 text-yellow-800 font-bold text-sm rounded-lg min-w-[60px]">
                        {formatPoints(item.points)}
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

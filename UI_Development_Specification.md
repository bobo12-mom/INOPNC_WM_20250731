# 건설 작업일지 시스템 - 화면 UI 개발 상세 기획서

## 📋 목차
1. [프로젝트 개요](#1-프로젝트-개요)
2. [전체 시스템 구조](#2-전체-시스템-구조)
3. [인증 시스템](#3-인증-시스템)
4. [대시보드 시스템](#4-대시보드-시스템)
5. [모바일 화면 상세 설계](#5-모바일-화면-상세-설계)
6. [데스크톱 화면 설계](#6-데스크톱-화면-설계)
7. [관리자 전용 시스템](#7-관리자-전용-시스템)
8. [공통 기능 컴포넌트](#8-공통-기능-컴포넌트)
9. [데이터 타입 정의](#9-데이터-타입-정의)
10. [상태 관리 및 네비게이션](#10-상태-관리-및-네비게이션)
11. [스타일링 가이드](#11-스타일링-가이드)
12. [접근성 및 사용성](#12-접근성-및-사용성)
13. [개발 환경 설정](#13-개발-환경-설정)
14. [배포 및 운영](#14-배포-및-운영)

---

## 1. 프로젝트 개요

### 1.1 시스템 명칭
- **시스템명**: 건설 작업일지 관리 시스템
- **개발사**: INOPNC (이노피앤씨)
- **플랫폼**: 웹 기반 반응형 애플리케이션
- **주요 기술**: Next.js, TypeScript, Tailwind CSS, shadcn/ui

### 1.2 시스템 목적
건설 현장의 작업일지 작성, 관리, 공유를 디지털화하여 효율적인 현장 관리와 협업을 지원하는 통합 관리 시스템

### 1.3 사용자 역할 정의
| 역할 | 영문명 | 설명 | 주요 권한 |
|------|--------|------|-----------|
| 작업자 | `worker` | 현장 작업자 | 작업일지 작성, 개인 업무 관리 |
| 현장관리자 | `site_manager` | 현장 총괄 관리 | 작업자 관리, 보고서 승인 |
| 파트너사 | `customer_manager` | 외부 협력업체 | 현장 정보 조회, 문서 공유 |
| 관리자 | `admin` | 시스템 관리 | 사용자 관리, 통계 관리, 승인 관리, 현장 관리, 시스템 모니터링 |
| 시스템관리자 | `system_admin` | 최고 권한 | 시스템 설정 관리, 전체 시스템 제어 |

#### 1.3.1 관리자 권한 상세
관리자(`admin`) 역할은 시스템의 중간 관리층으로서 다음과 같은 세부 권한을 가집니다:

**접근 가능 메뉴**:
- 홈 (핵심 요약) - 기본 탭
- 작업일지 - 전체 작업일지 조회 및 관리
- 출근/급여관리 - 전체 직원 근태 관리
- 내문서함 - 개인 문서 관리
- 현장정보 - 모든 현장 정보 조회/관리
- 공유문서함 - 전체 문서 관리
- **사용자 관리** - 관리자 전용
- **통계 대시보드** - 관리자 전용
- **고급 승인 관리** - 관리자 전용
- **현장 관리** - 관리자 전용
- **알림/공지사항** - 관리자 전용
- **시스템 설정** - 관리자 전용
- **보고서 생성** - 관리자 전용

**접근 불가 메뉴**:
- 빠른메뉴 (현장 작업자 전용 기능)

---

## 2. 전체 시스템 구조

### 2.1 화면 구성 방식
- **데스크톱**: 사이드바 + 메인 콘텐츠 영역
- **모바일**: 헤더 + 메인 콘텐츠 + 사이드바 (슬라이드) + 하단 네비게이션 바

### 2.2 반응형 기준점
- **모바일**: ~768px
- **데스크톱**: 768px~

### 2.3 색상 시스템
\`\`\`css
/* 주요 색상 팔레트 */
:root {
  /* 주색상 */
  --primary-blue: #3B82F6;
  
  /* 보조색상 */
  --secondary-green: #10B981;
  --secondary-orange: #F59E0B;
  --secondary-purple: #8B5CF6;
  
  /* 배경색 */
  --bg-primary: #F9FAFB;
  --bg-card: #FFFFFF;
  
  /* 텍스트 */
  --text-primary: #111827;
  --text-secondary: #4B5563;
  
  /* 경계선 */
  --border-color: #E5E7EB;
}
\`\`\`

---

## 3. 인증 시스템

### 3.1 로그인 화면
**파일 위치**: TBD

#### 3.1.1 레이아웃 구성
\`\`\`
┌─────────────────────────────────┐
│          INOPNC 로고            │
│       건설 작업일지 제목         │
├─────────────────────────────────┤
│         로그인 폼 카드          │
│  - 이메일 입력                  │
│  - 비밀번호 입력 (토글 가능)     │
│  - 로그인 버튼                  │
│  - 회원가입 링크                │
├─────────────────────────────────┤
│       빠른 로그인 (데모용)       │
│  - 작업자 계정                  │
│  - 현장관리자 계정              │
│  - 파트너사 계정                │
│  - 관리자 계정                  │
└─────────────────────────────────┘
\`\`\`

#### 3.1.2 주요 기능
- ✅ INOPNC 로고 표시 (80x80px)
- ✅ 이메일/비밀번호 입력 검증
- ✅ 비밀번호 표시/숨김 토글
- ✅ 로딩 상태 표시
- ✅ 에러 메시지 표시
- ✅ 역할별 빠른 로그인 버튼

#### 3.1.3 샘플 계정
\`\`\`typescript
const sampleUsers = [
  { 
    email: "worker@example.com", 
    name: "김작업", 
    role: "worker",
    password: "password"
  },
  { 
    email: "manager@example.com", 
    name: "박관리", 
    role: "site_manager",
    password: "password"
  },
  { 
    email: "customer@example.com", 
    name: "이파트너", 
    role: "customer_manager",
    password: "password"
  },
  { 
    email: "admin@example.com", 
    name: "최어드민", 
    role: "admin",
    password: "password"
  }
]
\`\`\`

### 3.2 회원가입 화면
**파일 위치**: TBD

- 기본 회원가입 폼 구조
- 역할 선택 드롭다운
- 현장 선택 기능

---

## 4. 대시보드 시스템

### 4.1 공통 컴포넌트

#### 4.1.1 헤더 컴포넌트
**파일 위치**: TBD

**기능**:
- 사용자 정보 표시
- 알림 아이콘
- 로그아웃 버튼
- 모드 표시 (게스트/퍼블릭)

#### 4.1.2 모바일 헤더
**파일 위치**: TBD

**기능**:
- 햄버거 메뉴 버튼
- 사용자명 표시
- 날씨 아이콘
- 알림 카운트

#### 4.1.3 사이드바
**파일 위치**: 
- TBD
- TBD

**기능**:
- 역할별 메뉴 표시
- 활성 탭 하이라이트
- 사용자 프로필 영역

### 4.2 메뉴 구성 시스템
**파일 위치**: TBD

#### 4.2.1 역할별 메뉴 매핑
\`\`\`typescript
export const menuItems: MenuItem[] = [
  {
    id: "빠른메뉴",
    label: "빠른 메뉴", 
    icon: Zap,
    roles: ["worker", "site_manager", "customer_manager"]
  },
  {
    id: "작업일지",
    label: "작업일지",
    icon: FileText,
    roles: ["worker", "site_manager", "admin"]
  },
  {
    id: "출근급여관리",
    label: "출근/급여관리",
    icon: Calendar,
    roles: ["worker", "site_manager", "admin"]
  },
  {
    id: "내문서함",
    label: "내문서함",
    icon: FolderOpen,
    roles: ["worker", "site_manager", "admin", "customer_manager"]
  },
  {
    id: "현장정보",
    label: "현장정보",
    icon: Building,
    roles: ["worker", "site_manager", "admin", "customer_manager"]
  },
  {
    id: "공유문서함",
    label: "공유문서함",
    icon: Share2,
    roles: ["worker", "site_manager", "admin", "customer_manager"]
  }
]
\`\`\`

#### 4.2.2 기본 탭 설정 로직
- **작업자, 현장관리자, 파트너사**: "빠른메뉴"가 기본
- **관리자**: "홈"이 기본

### 4.3 모바일 하단 네비게이션 바
**파일 위치**: TBD

#### 4.3.1 구성 요소
- **표시 조건**: 모바일 화면에서만 표시 (768px 이하)
- **위치**: 화면 하단 고정
- **높이**: 64px (h-16)
- **배경**: 흰색 배경 + 상단 경계선

#### 4.3.2 메뉴 구성
| 메뉴 | 아이콘 | 매핑되는 탭 ID |
|------|--------|---------------|
| 빠른메뉴 | Zap | 빠른메뉴 |
| 출력급여 | Clock | 출근급여관리 |
| 작업일지 | FileText | 작업일지 |
| 공도면 | Map | 공유문서함 |
| 내문서함 | FolderOpen | 내문서함 |

#### 4.3.3 상호작용
- 현재 선택된 메뉴는 primary 색상으로 하이라이트
- 탭 전환 시 사이드바와 동일한 activeTab 상태 공유
- 메인 콘텐츠 영역에 하단 여백(pb-20) 추가하여 내용이 가려지지 않도록 처리

---

## 5. 모바일 화면 상세 설계

### 5.1 홈 화면
**파일 위치**: TBD

#### 5.1.1 작업자 홈 화면 구성
\`\`\`
┌─────────────────────────────────┐
│     환영 메시지 (그라데이션)      │
│  - 사용자명 + 인사말             │
│  - 현재 시간 표시               │
├─────────────────────────────────┤
│         빠른 메뉴 카드   

    작업일지 작성, 출력/급여, 내문서함
    현장정보, 공도면
    (아이콘 + Label)         │
├─────────────────────────────────┤
│        오늘의 작업 카드         │
│  - 현장명 + 진행상태            │
│  - 소속회사 정보               │
│  - 현장 주소 (복사/T-map)       │
│  - 숙소 주소 (복사/T-map)                   │
│  - 건축담당            │
│  - 안전담당            │
├─────────────────────────────────┤
│       출근/급여 관리 카드        │
│  - 이번달 출근일수              │
│  - 예상 급여                   │
│  - 캘린더 보기 버튼             │
├─────────────────────────────────┤
│       요청 & 제안 카드          │
│  - 진행중인 요청사항            │
│  - 관리 페이지 이동 버튼         │
├─────────────────────────────────┤
│        내 문서함 카드           │
│  - 최근 문서 목록              │
│  - 전체보기 버튼               │
└─────────────────────────────────┘
\`\`\`

#### 5.1.2 현장관리자 홈 화면 구성
- 작업자 홈과 유사하지만 관리자 관점의 정보 표시
- 여러 작업 현황 동시 표시
- 작업자별 진행률 정보

#### 5.1.3 빠른 메뉴 버튼 동작
\`\`\`typescript
// 현장 공도면 버튼 클릭 시
const handleBlueprintClick = () => {
  onTabChange("공유문서함")
  setTimeout(() => {
    const searchInput = document.querySelector('[data-search="shared-documents"]')
    if (searchInput) {
      searchInput.value = "도면"
      // 검색 이벤트 트리거
    }
  }, 500)
}
\`\`\`

### 5.2 빠른 메뉴 화면
**파일 위치**: `components/dashboard/tabs/mobile-quick-menu-tab.tsx`

#### 5.2.1 화면 구성
\`\`\`
┌─────────────────────────────────┐
│           헤더 영역             │
│  - 빠른 메뉴 제목              │
│  - 설명 텍스트                 │
├─────────────────────────────────┤
│        빠른 액션 버튼 
        │
│  - 작업일지 작성 (고정)              │
│  - 출력 급역
|  - 현장 정보                 │
│  - 공도면                   │
│  - 내문서함               │
├─────────────────────────────────┤
│        상태 카드 영역           │
│  - 오늘의 작업 현황            │
│  - 미완료 작업                 │
│  - 승인 대기                   │
└─────────────────────────────────┘
```

#### 5.2.2 네비게이션 연동
- "작업일지 작성" 버튼 → `daily-report-create.tsx` 직접 이동
- 다른 메뉴들도 해당 탭으로 즉시 연결
- 빠른 접근을 통한 사용자 경험 개선

### 5.4 작업일지 조회 화면
**파일 위치**: TBD

#### 5.4.1 화면 구성
- 작업일지 목록 테이블
- 필터링 기능 (날짜, 작업자, 현장)
- 검색 기능
- 상세보기/편집 모달

### 5.5 출근/급여 관리 화면
**파일 위치**: TBD

#### 5.5.1 화면 구성
- 캘린더 뷰
- 출근/퇴근 체크
- 월별 근무 통계
- 급여 계산 정보

---

## 6. 데스크톱 화면 설계

### 6.1 레이아웃 구조
- 좌측 사이드바 고정 (240px)
- 메인 콘텐츠 영역 (나머지 공간)
- 상단 헤더 고정 (64px)

### 6.2 사이드바 구성
- 사용자 프로필 영역
- 메인 메뉴 리스트
- 관리자 전용 메뉴 (구분선 표시)
- 로그아웃 버튼

### 6.3 메인 콘텐츠 영역
- 각 탭별 전체 화면 활용
- 카드 기반 레이아웃
- 그리드 시스템 적용

---



---

## 8. 관리자 전용 시스템

### 8.1 개요
관리자(`admin`) 역할은 시스템의 중간 관리층으로서 사용자 관리, 통계 분석, 승인 관리 등 시스템 운영에 필요한 핵심 기능들을 담당합니다.

### 8.2 관리자 전용 메뉴 구성

#### 8.2.1 사용자 관리 시스템
**파일 위치**: TBD

**주요 기능**:
- 사용자 목록 조회 및 검색
- 사용자 권한 관리 (역할 변경)
- 계정 활성화/비활성화
- 신규 사용자 등록 승인
- 비밀번호 초기화
- 사용자별 활동 이력 조회

**화면 구성**:
```
┌─────────────────────────────────┐
│        사용자 관리 헤더         │
│  - 제목 + 신규 사용자 등록       │
├─────────────────────────────────
├─────────────────────────────────┤
│        검색 및 필터 영역         │
│  - 이름/이메일 검색             │
│  - 역할별 필터                 │
│  - 상태별 필터                 │
├─────────────────────────────────┤
│        사용자 목록 테이블        │
│  이름│이메일│역할│상태│등록일│액션│
│  김철수│worker@...│작업자│활성│...│편집│
│  박현장│manager@...│관리자│활성│...│편집│
└─────────────────────────────────┘
```

#### 8.2.2 통계 대시보드
**파일 위치**: `components/dashboard/tabs/admin/statistics-dashboard-tab.tsx`

**주요 기능**:
- 전체 시스템 사용 현황
- 사용자별 활동 통계
- 작업일지 작성 통계
- 승인 처리 현황
- 문서 관리 통계
- 현장별 진행률 분석
- 등

**화면 구성**:
```
┌─────────────────────────────────┐
│        대시보드 헤더            │
│  - 제목 + 기간 선택             │
├─────────────────────────────────┤
│        핵심 지표 카드           │
│  활성사용자│일일보고│승인대기│현장수│
│    45    │  127  │   8   │  12 │
├─────────────────────────────────┤
│         차트 영역 (2x2)         │
│  사용자활동그래프│일일보고트렌드    │
│  승인처리현황    │현장진행률       │
├─────────────────────────────────┤
│        상세 통계 테이블         │
│  - 현장별 세부 현황             │
│  - 사용자별 활동 순위           │
└─────────────────────────────────┘
```

#### 8.2.3 고급 승인 관리
**파일 위치**: `components/dashboard/tabs/admin/advanced-approval-tab.tsx`

**주요 기능**:
- 승인 워크플로 설정
- 대량 승인 처리
- 승인 권한 위임
- 승인 이력 관리
- 만료된 승인 처리
- 승인 알림 설정

**화면 구성**:
```
┌─────────────────────────────────┐
│        승인 관리 헤더           │
│  - 제목 + 워크플로 설정         │
├─────────────────────────────────┤
│        승인 현황 카드           │
│  전체│대기│승인│반려│만료       │
│  156│ 23│128│  3 │  2        │
├─────────────────────────────────┤
│       고급 관리 도구            │
│  - 대량 승인 처리              │
│  - 권한 위임 설정              │
│  - 만료 정책 관리              │
├─────────────────────────────────┤
│        승인 목록 테이블         │
│  유형│제목│신청자│상태│일자│액션  │
│  PTW│전기작업│김전기│대기│...│승인  │
│  보고서│일일보고│이작업│승인│...│보기│
└─────────────────────────────────┘
```

#### 8.2.4 현장 관리 시스템
**파일 위치**: `components/dashboard/tabs/admin/site-management-tab.tsx`

**주요 기능**:
- 현장 정보 등록/수정
- 현장별 작업자 배정
- 현장 상태 모니터링
- 현장별 진행률 추적
- 현장 문서 관리
- 현장별 통계 분석

#### 8.2.5 알림 및 공지사항
**파일 위치**: `components/dashboard/tabs/admin/notification-management-tab.tsx`

**주요 기능**:
- 시스템 공지사항 작성
- 사용자별 알림 설정
- 긴급 알림 발송
- 알림 템플릿 관리
- 알림 이력 조회
- 읽음 확인 통계

#### 8.2.6 시스템 설정 관리
**파일 위치**: `components/dashboard/tabs/admin/system-config-tab.tsx`

**주요 기능**:
- 기본 설정 관리
- 코드 관리 (작업 유형, 현장 구분)
- 휴일 설정
- 승인 워크플로 설정
- 문서 템플릿 관리
- 시스템 백업/복원

#### 8.2.7 보고서 생성 시스템
**파일 위치**: `components/dashboard/tabs/admin/report-generation-tab.tsx`

**주요 기능**:
- 월별/분기별 현장 보고서
- 작업자 근태 보고서
- 안전 사고 보고서
- 사용자 활동 보고서
- 승인 처리 보고서
- 사용자 정의 보고서

### 8.3 관리자 메뉴 구성 업데이트

기존 `utils/menu-config.ts` 파일에 관리자 전용 메뉴 추가:

```typescript
// 관리자 전용 메뉴 항목들
const adminMenuItems: MenuItem[] = [
  {
    id: "사용자관리",
    label: "사용자 관리",
    icon: Users,
    roles: ["admin", "system_admin"]
  },
  {
    id: "통계대시보드",
    label: "통계 대시보드", 
    icon: BarChart3,
    roles: ["admin", "system_admin"]
  },
  {
    id: "고급승인관리",
    label: "고급 승인관리",
    icon: CheckSquare,
    roles: ["admin", "system_admin"]
  },
  {
    id: "현장관리",
    label: "현장 관리",
    icon: MapPin,
    roles: ["admin", "system_admin"]
  },
  {
    id: "알림관리",
    label: "알림 관리",
    icon: Bell,
    roles: ["admin", "system_admin"]
  },
  {
    id: "시스템설정",
    label: "시스템 설정",
    icon: Settings,
    roles: ["admin", "system_admin"]
  },
  {
    id: "보고서생성",
    label: "보고서 생성",
    icon: FileBarChart,
    roles: ["admin", "system_admin"]
  }
]
```

### 8.4 관리자 대시보드 레이아웃

#### 8.4.1 데스크톱 레이아웃
- 좌측 사이드바: 기본 메뉴 + 관리자 전용 메뉴 (구분선으로 분리)
- 메인 영역: 선택된 관리 기능 표시
- 상단 헤더: 관리자 모드 표시 + 빠른 통계

#### 8.4.2 모바일 레이아웃  
- 슬라이드 사이드바: 관리자 메뉴 포함
- 하단 네비게이션: 기존 메뉴 유지 (관리자 전용 메뉴는 사이드바를 통해서만 접근)

### 8.5 권한 관리 시스템

#### 8.5.1 페이지 레벨 권한
```typescript
// 관리자 전용 페이지 접근 제어
const adminOnlyPages = [
  "사용자관리", "통계대시보드", "고급승인관리", 
  "현장관리", "알림관리", "시스템설정", "보고서생성"
]

const canAccessAdminPage = (userRole: UserRole, pageId: string) => {
  if (adminOnlyPages.includes(pageId)) {
    return ["admin", "system_admin"].includes(userRole)
  }
  return true
}
```

#### 8.5.2 기능 레벨 권한
- 읽기 전용 vs 편집 권한
- 승인 권한 vs 조회 권한
- 시스템 설정 변경 권한

### 8.6 데이터 타입 정의

#### 8.6.1 관리자 통계 타입
```typescript
// 파일 위치: src/types/admin-statistics.ts
export interface SystemStatistics {
  userStats: {
    total: number
    active: number
    inactive: number
    newToday: number
  }
  activityStats: {
    dailyReports: number
    approvals: number
    documentsUploaded: number
  }
  siteStats: {
    totalSites: number
    activeSites: number
    completedSites: number
  }
}
```

#### 8.6.2 사용자 관리 타입
```typescript
// 파일 위치: src/types/admin-user.ts
export interface AdminUser extends User {
  lastLoginDate?: string
  status: 'active' | 'inactive' | 'suspended'
  createdDate: string
  modifiedDate: string
  loginCount: number
}
```

### 8.7 개발 우선순위

**Phase 1: 핵심 관리 기능 (필수)**
1. 사용자 관리 시스템
2. 통계 대시보드  
3. 고급 승인 관리

**Phase 2: 운영 관리 기능**
4. 현장 관리 시스템
5. 알림 및 공지사항
6. 시스템 설정 관리

**Phase 3: 고급 기능**
7. 보고서 생성 시스템
8. 고급 통계 분석

---

## 9. 개발 환경 및 기술 스택

### 9.1 기술 스택
- **프론트엔드**: Next.js 15.4.3 + TypeScript
- **스타일링**: Tailwind CSS + shadcn/ui (부분 사용)
- **아이콘**: Lucide React
- **상태 관리**: React hooks (useState, useEffect, useCallback)
- **데이터 저장**: LocalStorage (임시)
- **개발 도구**: Turbopack (Next.js dev server)

### 9.2 프로젝트 구조
```
src/
├── components/
│   ├── auth/
│   └── dashboard/
│       ├── tabs/
│       │   ├── daily-report-create.tsx ⭐ 최신 업데이트
│       │   ├── quick-menu-tab.tsx
│       │   └── admin/
│       ├── dashboard-layout.tsx
│       ├── mobile-header.tsx
│       └── bottom-navigation.tsx
├── hooks/
│   └── use-worker-assignment.ts ⭐ 새로 생성
├── types/
│   ├── organization.ts ⭐ 새로 생성
│   ├── site.ts ⭐ 업데이트
│   └── assignment.ts
└── utils/
    └── menu-config.ts
```

### 9.3 개발 환경 설정
- **Node.js**: 18+ 버전 권장
- **패키지 관리자**: npm
- **개발 서버**: http://localhost:3001 (포트 3000 충돌 시 자동 변경)
- **빌드 도구**: Next.js with Turbopack

### 9.4 코드 품질 관리
- **TypeScript**: 엄격한 타입 체크
- **ESLint**: 코드 품질 검사
- **Prettier**: 코드 포맷팅 (설정 필요)
- **Git**: 버전 관리

---

## 10. 향후 개발 계획

### 10.1 단기 계획 (다음 스프린트)
1. **데이터 연동**: 실제 API 연결
2. **테스트 코드**: 단위 테스트 작성
3. **성능 최적화**: 번들 크기 최적화
4. **브라우저 호환성**: IE11 지원 검토

### 10.2 중기 계획 (1-2개월)
1. **관리자 시스템**: 8장에 명시된 관리자 기능 구현
2. **데이터베이스 연동**: 실제 DB 스키마 설계 및 연결
3. **인증 시스템**: JWT, OAuth 등 보안 강화
4. **파일 업로드**: 문서, 이미지 관리 시스템

### 10.3 장기 계획 (3-6개월)
1. **PWA 지원**: 모바일 앱 수준 경험 제공
2. **오프라인 모드**: 네트워크 연결 없이도 기본 기능 사용
3. **다국어 지원**: i18n 국제화
4. **고급 통계**: 차트, 대시보드 고도화

---

## 11. NPC-1000 자재 관리 시스템 (미구현 - 향후 개발 예정)

### 11.1 시스템 개요
**목적**: 건설 현장의 NPC-1000 자재 입출고 현황을 실시간으로 관리하고, 본사와 현장 간 정보 공유를 통해 자재 부족을 예방하는 통합 관리 시스템

### 11.2 현장 작업자 기능 (구현 완료)
**파일 위치**: `components/dashboard/tabs/daily-report-create.tsx`

#### 11.2.1 NPC-1000 사용기록 섹션
- **입고량**: 당일 NPC-1000 입고 수량 (kg 단위)
- **사용량**: 당일 NPC-1000 사용 수량 (kg 단위) 
- **잔량**: 현재 NPC-1000 잔여 수량 (kg 단위)
- **자동 경고**: 잔량 50kg 미만 시 본사 보충 요청 알림

#### 11.2.2 데이터 구조
```typescript
interface DailyReportData {
  // 기존 필드들...
  npc1000Incoming: string,  // NPC-1000 입고량
  npc1000Used: string,      // NPC-1000 사용량
  npc1000Remaining: string, // NPC-1000 잔량
}
```

### 11.3 본사 관리 시스템 

#### 11.3.1 Database Schema 설계
```sql
-- NPC-1000 자재 현황 테이블
CREATE TABLE npc1000_inventory (
  id VARCHAR(36) PRIMARY KEY,
  site_id VARCHAR(36) NOT NULL,
  work_date DATE NOT NULL,
  incoming_amount DECIMAL(10,2) DEFAULT 0, -- 입고량
  used_amount DECIMAL(10,2) DEFAULT 0,     -- 사용량
  remaining_amount DECIMAL(10,2) DEFAULT 0, -- 잔량
  reported_by VARCHAR(36) NOT NULL,        -- 보고자 ID
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (site_id) REFERENCES sites(id),
  FOREIGN KEY (reported_by) REFERENCES users(id),
  UNIQUE KEY unique_site_date (site_id, work_date)
);

-- 자재 알림/요청 테이블
CREATE TABLE material_requests (
  id VARCHAR(36) PRIMARY KEY,
  site_id VARCHAR(36) NOT NULL,
  material_type VARCHAR(50) DEFAULT 'NPC-1000',
  current_amount DECIMAL(10,2) NOT NULL,
  requested_amount DECIMAL(10,2) NOT NULL,
  priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
  status ENUM('pending', 'approved', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
  requested_by VARCHAR(36) NOT NULL,
  requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expected_delivery_date DATE,
  actual_delivery_date DATE,
  notes TEXT,
  
  FOREIGN KEY (site_id) REFERENCES sites(id),
  FOREIGN KEY (requested_by) REFERENCES users(id)
);

-- 자재 배송 기록 테이블
CREATE TABLE material_shipments (
  id VARCHAR(36) PRIMARY KEY,
  request_id VARCHAR(36),
  site_id VARCHAR(36) NOT NULL,
  material_type VARCHAR(50) DEFAULT 'NPC-1000',
  shipped_amount DECIMAL(10,2) NOT NULL,
  shipping_date DATE NOT NULL,
  expected_arrival_date DATE,
  actual_arrival_date DATE,
  carrier VARCHAR(100),
  tracking_number VARCHAR(100),
  status ENUM('preparing', 'shipped', 'in_transit', 'delivered', 'delayed') DEFAULT 'preparing',
  created_by VARCHAR(36) NOT NULL,
  
  FOREIGN KEY (request_id) REFERENCES material_requests(id),
  FOREIGN KEY (site_id) REFERENCES sites(id),
  FOREIGN KEY (created_by) REFERENCES users(id)
);
```

#### 11.3.2 본사 관리 UI 구성 (미구현)

**A. NPC-1000 종합 대시보드**
- 파일 위치: `components/dashboard/tabs/admin/npc1000-dashboard.tsx` (예정)
- 전체 현장 NPC-1000 현황 한눈에 보기
- 자재 부족 위험 현장 실시간 알림
- 일일/주간/월간 사용량 통계 및 트렌드 분석

**B. 현장별 상세 현황**
- 파일 위치: `components/dashboard/tabs/admin/site-inventory-detail.tsx` (예정)
- 현장별 일일 입고/사용/잔량 이력 추적
- 자재 소모 패턴 분석 및 예측
- 예상 소진 날짜 자동 계산

**C. 자재 요청 관리**
- 파일 위치: `components/dashboard/tabs/admin/material-request-manager.tsx` (예정)
- 현장 자재 요청 승인/반려 처리
- 우선순위별 배송 일정 관리
- 요청 이력 및 처리 현황 추적

**D. 배송 관리 시스템**
- 파일 위치: `components/dashboard/tabs/admin/shipment-tracker.tsx` (예정)
- 배송 계획 수립 및 스케줄링
- 운송업체 및 배송 상태 실시간 추적
- 배송 완료 확인 및 수령 관리

#### 11.3.3 UI 컴포넌트 설계 (미구현)

```typescript
// 예정 컴포넌트 목록
export interface NPC1000Components {
  NPC1000Dashboard: '종합 대시보드',
  SiteInventoryTable: '현장별 재고 현황 테이블',
  MaterialRequestManager: '자재 요청 관리',
  ShipmentTracker: '배송 추적',
  InventoryChart: '재고 현황 차트',
  AlertNotification: '자재 부족 알림',
  PredictiveAnalytics: '소모량 예측 분석'
}
```

### 11.4 시스템 통합 플로우

#### 11.4.1 데이터 흐름
1. **현장 입력**: 작업일지 작성 시 NPC-1000 사용량 기록
2. **실시간 동기화**: 본사 시스템으로 즉시 전송
3. **자동 분석**: AI 기반 소모 패턴 분석 및 부족 예측
4. **선제적 알림**: 부족 예상 시점 3일 전 자동 알림
5. **배송 자동화**: 승인된 요청의 자동 배송 스케줄링

#### 11.4.2 알림 시스템
- **현장 → 본사**: 잔량 부족 경고 (50kg 미만)
- **본사 → 현장**: 배송 일정 및 도착 예정 알림
- **시스템 알림**: 배송 지연, 재고 임계점 도달 등



---

## 12. 문서 업데이트 이력

### 2024-07-24 (최신)
- **5.3 작업일지 작성 화면** 전면 업데이트
- **7장 최신 개발 현황** 새로 추가
- 모든 섹션 번호 재정렬
- 완료된 기능들 상세 문서화
- 기술적 구현 세부사항 추가

### 이전 버전
- 초기 기획서 작성
- 기본 UI 구조 설계
- 역할별 권한 시스템 설계

---

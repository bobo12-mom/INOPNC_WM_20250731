import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, serviceKey)

async function insertNPC1000ComprehensiveData() {
  console.log('🏗️ NPC-1000 종합 자재 데이터 삽입 시작\n')
  
  try {
    // Get available sites first
    const { data: sites, error: sitesError } = await supabase
      .from('sites')
      .select('id, name')
      .limit(5) // Limit to first 5 sites for manageability
    
    if (sitesError || !sites || sites.length === 0) {
      throw new Error('No sites found')
    }
    
    console.log('✅ 현장 목록:')
    sites.forEach(site => console.log(`   - ${site.name} (${site.id})`))
    
    // Get material categories
    const { data: categories, error: categoriesError } = await supabase
      .from('material_categories')
      .select('*')
    
    if (categoriesError) throw categoriesError
    
    console.log(`\n✅ 자재 카테고리: ${categories?.length || 0}개`)
    
    // 1. Insert Materials Data
    console.log('\n📦 1단계: 자재 데이터 삽입')
    
    const materialsToInsert = [
      // 콘크리트 관련 자재
      {
        name: 'Ready-Mix 콘크리트 24-21-150',
        code: 'C-RM-24150',
        category_id: categories?.find(c => c.code === 'C')?.id,
        unit: 'm³',
        unit_price: 85000,
        manufacturer: '현대레미콘',
        specification: '강도: 24MPa, 슬럼프: 150mm, 골재최대크기: 25mm',
        is_active: true
      },
      {
        name: 'Ready-Mix 콘크리트 27-18-120',
        code: 'C-RM-27120',
        category_id: categories?.find(c => c.code === 'C')?.id,
        unit: 'm³',
        unit_price: 92000,
        manufacturer: '삼표레미콘',
        specification: '강도: 27MPa, 슬럼프: 120mm, 골재최대크기: 25mm',
        is_active: true
      },
      {
        name: 'Ready-Mix 콘크리트 30-15-100',
        code: 'C-RM-30100',
        category_id: categories?.find(c => c.code === 'C')?.id,
        unit: 'm³',
        unit_price: 98000,
        manufacturer: '현대레미콘',
        specification: '강도: 30MPa, 슬럼프: 100mm, 골재최대크기: 20mm',
        is_active: true
      },
      {
        name: '고강도 콘크리트 40-12-80',
        code: 'C-HS-40080',
        category_id: categories?.find(c => c.code === 'C')?.id,
        unit: 'm³',
        unit_price: 125000,
        manufacturer: '삼표레미콘',
        specification: '강도: 40MPa, 슬럼프: 80mm, 골재최대크기: 20mm',
        is_active: true
      },
      {
        name: '방수 콘크리트 24-18-120',
        code: 'C-WP-24120',
        category_id: categories?.find(c => c.code === 'C')?.id,
        unit: 'm³',
        unit_price: 95000,
        manufacturer: '한일시멘트',
        specification: '강도: 24MPa, 슬럼프: 120mm, 방수타입: A형',
        is_active: true
      },
      
      // 철근 관련 자재
      {
        name: 'SD400 이형철근 D13',
        code: 'R-SD400-D13',
        category_id: categories?.find(c => c.code === 'R')?.id,
        unit: 'ton',
        unit_price: 920000,
        manufacturer: '현대제철',
        specification: '등급: SD400, 직경: 13mm, 길이: 12m',
        is_active: true
      },
      {
        name: 'SD400 이형철근 D16',
        code: 'R-SD400-D16',
        category_id: categories?.find(c => c.code === 'R')?.id,
        unit: 'ton',
        unit_price: 915000,
        manufacturer: '포스코',
        specification: '등급: SD400, 직경: 16mm, 길이: 12m',
        is_active: true
      },
      {
        name: 'SD400 이형철근 D19',
        code: 'R-SD400-D19',
        category_id: categories?.find(c => c.code === 'R')?.id,
        unit: 'ton',
        unit_price: 910000,
        manufacturer: '현대제철',
        specification: '등급: SD400, 직경: 19mm, 길이: 12m',
        is_active: true
      },
      {
        name: 'SD500 고강도철근 D22',
        code: 'R-SD500-D22',
        category_id: categories?.find(c => c.code === 'R')?.id,
        unit: 'ton',
        unit_price: 950000,
        manufacturer: '포스코',
        specification: '등급: SD500, 직경: 22mm, 길이: 12m',
        is_active: true
      },
      {
        name: 'SD500 고강도철근 D25',
        code: 'R-SD500-D25',
        category_id: categories?.find(c => c.code === 'R')?.id,
        unit: 'ton',
        unit_price: 945000,
        manufacturer: '현대제철',
        specification: '등급: SD500, 직경: 25mm, 길이: 12m',
        is_active: true
      },
      
      // 골재 관련 자재
      {
        name: '쇄석 20-5mm (1종)',
        code: 'A-CS-20-5',
        category_id: categories?.find(c => c.code === 'A')?.id,
        unit: 'm³',
        unit_price: 18000,
        manufacturer: '대한골재',
        specification: '크기: 20-5mm, 등급: 1종, 밀도: 1.65t/m³',
        is_active: true
      },
      {
        name: '쇄석 25-5mm (1종)',
        code: 'A-CS-25-5',
        category_id: categories?.find(c => c.code === 'A')?.id,
        unit: 'm³',
        unit_price: 17500,
        manufacturer: '동양골재',
        specification: '크기: 25-5mm, 등급: 1종, 밀도: 1.65t/m³',
        is_active: true
      },
      {
        name: '강모래 (세척사)',
        code: 'A-RS-W',
        category_id: categories?.find(c => c.code === 'A')?.id,
        unit: 'm³',
        unit_price: 22000,
        manufacturer: '한강골재',
        specification: '타입: 세척사, 조립률: 2.6, 밀도: 1.55t/m³',
        is_active: true
      },
      {
        name: '바다모래 (세척사)',
        code: 'A-SS-W',
        category_id: categories?.find(c => c.code === 'A')?.id,
        unit: 'm³',
        unit_price: 25000,
        manufacturer: '서해골재',
        specification: '타입: 세척사, 조립률: 2.7, 밀도: 1.58t/m³',
        is_active: true
      },
      
      // 시멘트 관련 자재
      {
        name: '포틀랜드 시멘트 1종',
        code: 'C-PC-T1',
        category_id: categories?.find(c => c.code === 'C')?.id,
        unit: 'ton',
        unit_price: 95000,
        manufacturer: '한라시멘트',
        specification: '종류: 1종, 강도: 42.5MPa, 분말도: 3200cm²/g',
        is_active: true
      },
      {
        name: '고로슬래그 시멘트 3종',
        code: 'C-BS-T3',
        category_id: categories?.find(c => c.code === 'C')?.id,
        unit: 'ton',
        unit_price: 88000,
        manufacturer: '쌍용C&E',
        specification: '종류: 3종, 슬래그함량: 60%, 강도: 32.5MPa',
        is_active: true
      },
      
      // 기타 자재
      {
        name: '거푸집 합판 12T',
        code: 'F-PL-12T',
        category_id: categories?.find(c => c.code === 'O')?.id,
        unit: 'sheet',
        unit_price: 35000,
        manufacturer: '동화기업',
        specification: '두께: 12mm, 규격: 1200x2400mm, 등급: WBP',
        is_active: true
      },
      {
        name: '각목 50x100mm',
        code: 'T-SQ-50100',
        category_id: categories?.find(c => c.code === 'O')?.id,
        unit: 'm',
        unit_price: 4500,
        manufacturer: '삼성목재',
        specification: '단면: 50x100mm, 등급: 1급, 함수율: 18%',
        is_active: true
      },
      {
        name: '와이어메쉬 D6-200x200',
        code: 'R-WM-D6-200',
        category_id: categories?.find(c => c.code === 'R')?.id,
        unit: 'm²',
        unit_price: 8500,
        manufacturer: '대한철망',
        specification: '직경: 6mm, 메쉬: 200x200mm, 판크기: 2x3m',
        is_active: true
      }
    ]
    
    const { data: insertedMaterials, error: materialsInsertError } = await supabase
      .from('materials')
      .insert(materialsToInsert)
      .select()
    
    if (materialsInsertError) throw materialsInsertError
    
    console.log(`✅ ${insertedMaterials?.length || 0}개 자재 삽입 완료`)
    
    // 2. Insert Inventory Data for each site
    console.log('\n📊 2단계: 현장별 재고 데이터 삽입')
    
    const inventoryData = []
    
    for (const site of sites) {
      console.log(`\n   🏗️ ${site.name} 현장 재고 생성...`)
      
      for (const material of insertedMaterials!) {
        // 각 자재별로 현실적인 재고량 설정
        let currentStock = 0
        let minStock = 0
        let maxStock = 0
        
        switch (material.unit) {
          case 'm³': // 콘크리트, 골재
            currentStock = Math.floor(Math.random() * 200) + 50  // 50-250m³
            minStock = 20
            maxStock = 500
            break
          case 'ton': // 철근, 시멘트
            currentStock = Math.floor(Math.random() * 50) + 10   // 10-60ton
            minStock = 5
            maxStock = 100
            break
          case 'sheet': // 합판
            currentStock = Math.floor(Math.random() * 500) + 100 // 100-600매
            minStock = 50
            maxStock = 1000
            break
          case 'm': // 각목
            currentStock = Math.floor(Math.random() * 2000) + 500 // 500-2500m
            minStock = 200
            maxStock = 5000
            break
          case 'm²': // 와이어메쉬
            currentStock = Math.floor(Math.random() * 1000) + 200 // 200-1200m²
            minStock = 100
            maxStock = 2000
            break
          default:
            currentStock = Math.floor(Math.random() * 100) + 20
            minStock = 10
            maxStock = 200
        }
        
        inventoryData.push({
          site_id: site.id,
          material_id: material.id,
          current_stock: currentStock,
          min_stock_level: minStock,
          max_stock_level: maxStock,
          last_updated: new Date().toISOString()
        })
      }
    }
    
    const { data: insertedInventory, error: inventoryInsertError } = await supabase
      .from('material_inventory')
      .insert(inventoryData)
      .select()
    
    if (inventoryInsertError) throw inventoryInsertError
    
    console.log(`✅ ${insertedInventory?.length || 0}개 재고 기록 삽입 완료`)
    
    // 3. Insert Transaction History
    console.log('\n📈 3단계: 자재 거래 이력 생성')
    
    const transactionData = []
    const transactionTypes = ['입고', '출고', '조정', '이월']
    
    // 각 현장별로 최근 30일간의 거래 이력 생성
    for (const site of sites) {
      console.log(`   🏗️ ${site.name} 현장 거래 이력...`)
      
      // 랜덤하게 일부 자재에 대해 거래 이력 생성
      const selectedMaterials = insertedMaterials!
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(insertedMaterials!.length * 0.7)) // 70% 자료만 선택
      
      for (let i = 0; i < 15; i++) { // 현장당 15개 거래 기록
        const material = selectedMaterials[Math.floor(Math.random() * selectedMaterials.length)]
        const transactionType = transactionTypes[Math.floor(Math.random() * transactionTypes.length)]
        const daysAgo = Math.floor(Math.random() * 30)
        const transactionDate = new Date()
        transactionDate.setDate(transactionDate.getDate() - daysAgo)
        
        let quantity = 0
        switch (material.unit) {
          case 'm³':
            quantity = Math.floor(Math.random() * 50) + 10  // 10-60m³
            break
          case 'ton':
            quantity = Math.floor(Math.random() * 20) + 5   // 5-25ton
            break
          case 'sheet':
            quantity = Math.floor(Math.random() * 100) + 20 // 20-120매
            break
          case 'm':
            quantity = Math.floor(Math.random() * 500) + 100 // 100-600m
            break
          case 'm²':
            quantity = Math.floor(Math.random() * 200) + 50  // 50-250m²
            break
          default:
            quantity = Math.floor(Math.random() * 50) + 10
        }
        
        // 출고는 음수로 처리
        if (transactionType === '출고') {
          quantity = -quantity
        }
        
        transactionData.push({
          site_id: site.id,
          material_id: material.id,
          transaction_type: transactionType,
          quantity,
          unit_price: material.unit_price,
          total_amount: Math.abs(quantity) * material.unit_price,
          supplier: material.manufacturer,
          transaction_date: transactionDate.toISOString().split('T')[0],
          notes: `${transactionType} - ${material.name}`,
          created_at: new Date().toISOString()
        })
      }
    }
    
    const { data: insertedTransactions, error: transactionInsertError } = await supabase
      .from('material_transactions')
      .insert(transactionData)
      .select()
    
    if (transactionInsertError) throw transactionInsertError
    
    console.log(`✅ ${insertedTransactions?.length || 0}개 거래 이력 삽입 완료`)
    
    // 4. Summary Report
    console.log('\n📋 삽입 완료 요약:')
    console.log(`   📦 자재: ${insertedMaterials?.length || 0}개`)
    console.log(`   📊 재고 기록: ${insertedInventory?.length || 0}개`)
    console.log(`   📈 거래 이력: ${insertedTransactions?.length || 0}개`)
    console.log(`   🏗️ 현장: ${sites.length}개`)
    
    console.log('\n🎉 NPC-1000 종합 데이터 삽입 완료!')
    
  } catch (error) {
    console.error('❌ 오류 발생:', error)
  }
}

insertNPC1000ComprehensiveData()
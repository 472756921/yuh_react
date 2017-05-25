/**
 * Created by Benson on 2017/5/3.
 */
import React from 'react';
import AppHead from './Head/HeadMain';
import IntroductionStyle from  '../styles/Introduction.css';

class Introduction extends React.Component{
  render(){
    return(
      <div>
        <AppHead type="TOP"/>
        <div className={IntroductionStyle.content}>
          <h3>公司简介</h3>
          <p className={IntroductionStyle.te} >深圳优医汇信息技术有限公司注册于2015年5月，公司主营业务是慢性疾病管理及控制，致力于开发简单、易用的互联网医疗产品。目前老龄人口数量急剧增加，老年患者慢病管理需求巨大，政府持续出台针对互联网医疗的政策利好，优医汇，着眼解决医院-医生-患者持续良性互动、持续粘性问题，愿景是做国内专业慢病管理平台，目前，已设计并研发出国内首款专注于老年病管理控制的互联网医疗产品—优医医生端。</p>
          <br/>
          <h3>产品简介</h3>
          <p className={IntroductionStyle.te}>
            优医医生端，短期目标是成为老年慢性疾病管控的互联网医疗入口，并探索行之有效、易于大规模复制的途径及经验，未来在老年医学以外学科进行推广。目前国外老年医学领军医院-美国约翰霍普金斯及国内领军医院-北京协和医院及四川华西医院，其老年医学科发展都强调综合评估入手，多学科协作诊疗理念，顺应这一老年医学发展趋势，优医对目前老年患者线下真实就诊模式进行了功能抽象和产品设计，直接与国内顶尖老年医学科（目前合作医院包括华西及全国三个临床重点老年病专科或老年病研究所）合作，选取年富力强、在业界具有一定影响力、深谙现实医疗模式痛点的真实医生组建医疗团队并整体移植上线，团队包括高级职称老年病专业医生，3～4名不同专业方向医生、心理精神专业医生、临床药师、营养师、护理人员、理疗师，线上线下互通，保证了精准和高质量的诊疗。同时，优医着眼解决医生临床工作繁忙、缺乏精细管理患者时间及数据收集、保存、分析的困境，首创老年慢病管控医疗团队、医生慢病管理师模式，慢病管理师在患者和主诊接诊医生间建立简洁有效沟通渠道，以点带面，点面结合，诊前、诊中、诊后全程无缝覆盖，高效利用时间、管理现有患者，又便于大规模复制及推广至同类医疗团队。软件技术层面，优医于国内首创服务于患者的慢病管理数据库，对每一位就诊者经过综合评估和针对性检查后制定综合的、长期照料计划，并建立云存储电子病历档案，既便于线上随访管理，又便于医生分析数据、开展高质量临床科研，未来更可与医院HIS系统对接（已完成国内独创手写或电子文本病历精准数据抓取及云存储模块），实现大批量患者整体导入，直接解决目前不同医院不同HIS系统数据孤岛现象。最后，优医组建了资深线下销售、推广及软件服务团队，强大的药企、药店及医药电商合作资源，未来可期待的诊疗流程闭环。
          </p>
          <br/>
          <h3>联系方式</h3>
          <p className={IntroductionStyle.te}>
            联系电话： 0755-23481650
          </p>
          <p className={IntroductionStyle.te}>
            地址：广东省深圳市罗湖区莲塘街道国威路雍翠豪园
          </p>
        </div>
      </div>
    )
  }
}
export default Introduction;
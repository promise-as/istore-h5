import React, {Component} from "react"
import ReactDOM from "react-dom"
import {Provider, observer, inject} from 'mobx-react'

import I18nProvider from './../../library/components/i18n_provider/index'

import stores from "./stores"
import * as tools from "../../library/tools"

import './index.scss'

// 隐私
@inject('pageinitStore')
@observer
class PrivacyWrap extends Component {
    constructor(options) {
        super(options)

    }

    static getTransitionLan(lan) {
        switch (lan) {
            case 'zh-Hans':
                return 'zh'
            case 'zh-Hans-CN':
                return 'zh'
            case 'cn':
                return 'zh'
            default:
                return lan
        }
    }

    componentWillMount() {
        let lang = PrivacyWrap.getTransitionLan(tools.getUrlParam('lang'))
        this.props.pageinitStore.setI18nMessagesInfoHandle((lang.indexOf('en') > -1 ? 'en' : 'zh'))
    }

    render() {
        let lang = this.props.pageinitStore.intl.locale

        return <div className="privacywrap">
            {
                lang === 'zh' ?  <div>
                    <div className="privacy-h1">隐私权政策</div>
                    <h2 className="privacy-h2">一、引言</h2>
                    <p className="privacy-content">
                        【爱士多(广州)电子科技发展有限公司】（以下简称“我们”）深知个人信息对您的重要性，并会尽全力保护您的个人信息安全可靠。我们致力于维持您对我们的信任，恪守以下原则，保护您的个人信息：权责一致原则、目的明确原则、选择同意原则、最少够用原则、确保安全原则、主体参与原则、公开透明原则等。同时，我们承诺，我们将按业界成熟的安全标准，采取相应的安全保护措施来保护您的个人信息。
                    </p>
                    <p>请在使用我们的产品（或服务）前，仔细阅读并了解本《隐私权政策》。</p>
                    <h2 className="privacy-h2">二、我们可能收集的信息</h2>
                    <p className="privacy-content">我们提供服务时，可能会收集、储存和使用下列与您有关的信息。如果您不提供相关信息，可能无法注册成为我们的用户、享受我们提供的某些服务，或者即便我们可以继续向您提供一些服务，也无法达到该服务拟达到的效果。</p>
                    <h3 className="privacy-h3">（一）您提供的信息</h3>
                    <ul className="privacy-ul">
                        <li>您在注册我们的账户或使用我们的服务时，向我们提供的相关个人信息，例如电话号码、电子邮件、银行卡号等；</li>
                        <li>您通过我们的服务向其他方提供的共享信息，以及您使用我们的服务时所储存的信息。</li>
                    </ul>
                    <h3 className="privacy-h3">（二）其他方分享的您的信息</h3>
                    <p>其他方使用我们的服务时所提供有关您的共享信息。</p>
                    <h3 className="privacy-h3">（三）我们获取的您的信息</h3>
                    <p>我们收集数据是根据您与我们的互动和您所做出的选择，包括您的隐私设置以及您使用的产品和功能。</p>
                    <p>我们收集的数据可能包括SDK/API/JS代码版本、浏览器、互联网服务提供商、IP地址、平台、时间戳、应用标识符、应用程序版本、应用分发渠道、独立设备标识符、iOS广告标识符（IDFA)、安卓广告主标识符、网卡（MAC）地址、国际移动设备识别码（IMEI）、设备型号、终端制造厂商、终端设备操作系统版本、会话启动/停止时间、语言所在地、时区和网络状态（WiFi等）、硬盘、CPU和电池使用情况等。 </p>
                    <p>我们收集的有关您位置的信息，包括您通过具有定位功能的移动设备使用我们的服务时，我们通过 GPS 或 WiFi
                        等方式收集的您的地理位置信息；您或其他用户提供的包含您所处地理位置的实时信息，例如您提供的账户信息中包含的您所在地区信息，您或其他人上传的显示您当前或曾经所处地理位置的共享信息，例如您或其他人共享的照片包含的地理标记信息；</p>
                    <p>您可以通过关闭定位功能随时停止我们对您的地理位置信息的收集。</p>
                    <h3 className="privacy-h3">三、我们可能如何使用信息</h3>
                    <p className="privacy-content">我们可能将在向您提供服务的过程之中所收集的信息用作下列用途：</p>
                    <ul className="privacy-ul">
                        <li>向您提供服务；</li>
                        <li>在我们提供服务时，用于身份验证、客户服务、安全防范、诈骗监测、存档和备份用途，</li>
                        <li>确保我们向您提供的产品和服务的安全性；</li>
                        <li>帮助我们设计新服务，改善我们现有服务；</li>
                        <li>使我们更加了解您如何接入和使用我们的服务，从而针对性地回应您的个性化需求，例如语言设定、位置设定、个性化的帮助服务和指示，或对您和其他使用我们服务的用户作出其他方面的回应；</li>
                        <li>软件认证或管理软件升级；</li>
                        <li>让您参与有关我们产品和服务的调查。</li>
                    </ul>
                    <h2 className="privacy-h2">四、您如何访问和控制自己的个人信息</h2>
                    <p className="privacy-content">我们将尽一切可能采取适当的技术手段，保证您可以访问、更新和更正自己的注册信息或使用我们的服务时提供的其他个人信息。在访问、更新、更正和删除您的个人信息时，我们可能会要求您进行身份验证，以保障您的账户安全。</p>
                    <h2 className="privacy-h2">五、我们可能分享的信息</h2>
                    <p>除以下情形外，未经您同意，我们以及我们的关联公司不会与任何第三方分享您的个人信息：</p>
                    <p>我们以及我们的关联公司可能将您的个人信息与我们的关联公司、合作伙伴及第三方服务供应商、承包商及代理（例如代表我们发出电子邮件或推送通知的通讯服务提供商、以及为我们提供位置数据的地图服务供应商）分享（他们可能并非位于您所在法域），用作下列用途：</p>
                    <ul className="privacy-ul">
                        <li>向您提供我们的服务；</li>
                        <li>实现“我们可能如何使用信息”部分所述目的；</li>
                        <li>履行我们在本《隐私政策》中的义务和行使我们的权利；</li>
                        <li>理解、维护和改善我们的服务。</li>
                    </ul>
                    <p className="privacy-content">如我们或我们的关联公司与任何上述第三方分享您的个人信息，我们将努力确保该等第三方在使用您的个人信息时遵守本《隐私政策》及我们要求其遵守的其他适当的保密和安全措施。</p>
                    <p className="privacy-content">我们或我们的关联公司还可能为以下需要保留、保存或披露您的个人信息：</p>
                    <ul className="privacy-ul">
                        <li>遵守适用的法律法规；</li>
                        <li>遵守法院命令或其他法律程序的规定；</li>
                        <li>遵守相关政府机关的要求；</li>
                        <li>为遵守适用的法律法规、维护社会公共利益、或保护我们或我们的集团公司、我们的客户、其他用户或雇员的人身和财产安全或合法权益所合理必需的用途。</li>
                    </ul>

                    <h2 className="privacy-h2">六、信息安全</h2>
                    <p className="privacy-content">我们仅在本《隐私政策》所述目的所必需期间和法律法规要求的时限内保留您的个人信息。我们使用各种安全技术和程序，以防信息的丢失、不当使用、未经授权阅览或披露。例如，在某些服务中，我们将利用加密技术（例如SSL）来保护您提供的个人信息。但请您谅解，由于技术的限制以及以及可能存在的各种恶意手段，在互联网行业，即便竭尽所能加强安全措施，也不可能始终保证信息百分之百的安全。您需要了解，您接入我们的服务所用的系统和通讯网络，有可能因我们可控范围外的情况而发生问题。</p>

                    <h2 className="privacy-h2">七、您分享的信息</h2>
                    <p className="privacy-content">我们的多项服务，可让您不仅与您的社交网络、也与使用该服务的所有用户公开分享您的相关信息，例如，您在我们的服务中所上传或发布的信息（包括您公开的个人信息、您建立的名单）、您对其他人上传或发布的信息作出的回应，以及包括与这些信息有关的位置数据和日志信息。使用我们服务的其他用户也有可能分享与您有关的信息（包括位置数据和日志信息）。只要您不删除共享信息，有关信息会一直留存在公众领域；即使您删除共享信息，有关信息仍可能由其他用户或不受我们控制的非关联第三方独立地缓存、复制或储存，或由其他用户或该等第三方在公众领域保存。</p>
                    <p className="privacy-content">因此，请您谨慎考虑通过我们的服务上传、发布和交流的信息内容。在一些情况下，您可通过我们某些服务的隐私设定来控制有权浏览您的共享信息的用户范围。如要求从我们的服务中删除您的相关信息，请通过该等特别服务条款提供的方式操作。</p>

                    <h2 className="privacy-h2">八、您分享的敏感个人信息</h2>
                    <p className="privacy-content">某些个人信息因其特殊性可能被认为是敏感个人信息，例如您的种族、宗教、个人健康和医疗信息等。相比其他个人信息，敏感个人信息受到更加严格的保护。</p>
                    <p className="privacy-content">请注意，您在我们的服务中所提供、上传或发布的内容和信息（例如有关您社交活动的照片等信息），可能会泄露您的敏感个人信息。您需要谨慎地考虑，是否在使用我们的服务时披露相关敏感个人信息。</p>
                    <p className="privacy-content"><strong>您同意您的敏感个人信息按本《隐私政策》所述的目的和方式来处理。</strong></p>

                    <h2 className="privacy-h2">九、我们可能如何收集信息</h2>
                    <p className="privacy-content">我们或我们的第三方合作伙伴，可能通过 cookies 和 web beacon 收集和使用您的信息，并将该等信息储存为日志信息。</p>

                    <h2 className="privacy-h2">十、我们可能向您发送的邮件和信息</h2>
                    <p className="privacy-content">我们可能在必需时（例如因系统维护而暂停某一项服务时）向您发出与服务有关的公告。您可能无法取消这些与服务有关、性质不属于推广的公告。</p>

                    <h2 className="privacy-h2">十一、隐私政策的适用例外</h2>

                    <p className="privacy-content">我们的服务可能包括或链接至第三方提供的社交媒体或其他服务（包括网站）。例如：</p>

                    <p className="privacy-content">您利用“分享”键将某些内容分享到我们的服务，或您利用第三方连线服务登录我们的服务。这些功能可能会收集您的相关信息（包括您的日志信息）。</p>

                    <p className="privacy-content">您利用“分享”键将某些内容分享到我们的服务，或您利用第三方连线服务登录我们的服务。这些功能可能会收集您的相关信息（包括您的日志信息）。</p>

                    <p className="privacy-content">
                        <strong>本《隐私政策》仅适用于我们所收集的信息，并不适用于任何第三方提供的服务或第三方的信息使用规则，我们对任何第三方使用由您提供的信息不承担任何责任。</strong></p>

                    <h2 className="privacy-h2">十二、未成年人使用我们的服务</h2>
                    <p className="privacy-content">我们鼓励父母或监护人指导未满十八岁的未成年人使用我们的服务。我们建议未成年人鼓励他们的父母或监护人阅读本《隐私政策》，并建议未成年人在提交的个人信息之前寻求父母或监护人的同意和指导。</p>

                    <h2 className="privacy-h2">十三、本隐私权政策如何更新</h2>

                    <p className="privacy-content">我们可能适时会对本隐私权政策进行调整或变更，本隐私权政策的任何更新将以标注更新时间的方式公布在我们APP上，除法律法规或监管规定另有强制性规定外，经调整或变更的内容一经通知或公布后的7日后生效。如您在隐私权政策调整或变更后继续使用我们提供的任一服务或使用我们APP的，我们相信这代表您已充分阅读、理解并接受修改后的隐私权政策并受其约束。</p>


                    <h2 className="privacy-h2">隐私政策的适用范围</h2>
                    <p className="privacy-content">除某些特定服务外，我们所有的服务均适用本《隐私政策》。这些特定服务将适用特定的隐私政策。针对某些特定服务的特定隐私政策，将更具体地说明我们在该等服务中如何使用您的信息。该特定服务的隐私政策构成本《隐私政策》的一部分。如任何特定服务的隐私政策与本《隐私政策》有不一致之处，则适用特定服务的隐私政策。</p>

                    <h2 className="privacy-h2">如何联系我们</h2>
                    <p className="privacy-content">如果您对本隐私政策有任何疑问、意见或建议，通过以下方式与我们联系：</p>

                    <h2 className="privacy-h2">电话：400-8255250 </h2>
                    <p className="privacy-content">一般情况下，我们将在三十天内回复。</p>
                </div> : <div>
                    <div className="privacy-h1">Privacy policy</div>
                    <h2 className="privacy-h2">1、introduction</h2>
                    <p className="privacy-content">Astor (Guangzhou) Dsy technology Ltd(hereinafter referred to as "we") fully aware of the importance of personal information to you, and will do its utmost to protect your personal information security and reliability. We are committed to maintaining your trust in us, abiding by the following principles and protecting your personal information: the principle of unanimity of power and responsibility, the principle of clear purpose, the principle of choice and consent, the principle of minimum utility, the principle of ensuring security, the principle of participation in the main body, the principle of openness and transparency. At the same time, we promise that we will take appropriate security measures to protect your personal information in accordance with the industry's mature security standards.</p>
                    <p>Please read and understand the privacy policy carefully before using our products (or services).</p>
                    <h2 className="privacy-h2">2、The information we may gather</h2>
                    <p className="privacy-content">When we provide services, we may collect, store and use the following information about you. If you do not provide relevant information, you may not be able to register as our users, enjoy some of the services we provide, or even if we can continue to provide you with some services, can not achieve the desired effect of the service.</p>
                    <h3 className="privacy-h3">2.1 The information you provide</h3>
                    <ul className="privacy-en">
                        <li>a) When you register our account or use our services, you provide us with relevant personal information, such as telephone number, e-mail, bank card number, etc.</li>
                        <li>b) Shared information that you provide to others through our services, and the information that you store when you use our services.</li>
                    </ul>
                    <h3 className="privacy-h3">2.2 Other parties share your information.</h3>
                    <p>Other parties provide information about your sharing when using our services.</p>
                    <h3 className="privacy-h3">2.3 We get your information.</h3>
                    <p>We collect data based on your interactions with us and the choices you make, including your privacy settings and the products and functions you use.</p>
                    <p>The data we collected may include SDK/API/JS code versions, browsers, Internet service providers, IP addresses, platforms, timestamps, application identifiers, application versions, application distribution channels, stand-alone device identifiers, iOS advertisement identifiers (IDFAs), Android advertiser identifiers, network card (MAC) addresses, International Mobile Device Identification Code (IMEI), device model, terminal manufacturer, operating system version of terminal device, session start/stop time, language location, time zone and network status (WiFi, etc.), hard disk, CPU and battery usage, etc.</p>
                    <p>We collect information about your location, including your geographic location information that we collect through GPS or WiFi when you use our services on location-enabled mobile devices; real-time information about your location provided by you or other users, such as your account information, includes Information about your location, shared information that you or someone else uploaded to show where you are or have been, such as geographic tagging information contained in photos shared by you or others;</p>
                    <p>You can stop our collection of your geographic information at any time by closing the location function.</p>
                    <h3 className="privacy-h3">3、How can we use information?</h3>
                    <p className="privacy-content">The information we may collect in the process of providing services to you may be used for the following purposes:</p>
                    <ul className="privacy-en">
                        <li>a) to provide you with services;</li>
                        <li>b) Used for authentication, customer service, security, fraud detection, archiving and backup purposes when we provide services,</li>
                        <li>c) Ensure the security of the products and services we provide to you;</li>
                        <li>d) help us design new services and improve our existing services;</li>
                        <li>e) Make us more aware of how you access and use our services to respond to your personalized needs, such as language settings, location settings, personalized help services and instructions, or to respond to you and other users of our services;</li>
                        <li>f）software authentication or management software upgrade;</li>
                        <li>g) let you participate in the investigation of our products and services.</li>
                    </ul>
                    <h2 className="privacy-h2">4、How do you access and control your personal information?</h2>
                    <p className="privacy-content">We will do everything possible to adopt appropriate technical means to ensure that you can access, update and correct your own registration information or other personal information provided when using our services. In accessing, updating, correcting, and deleting your personal information, we may require you to authenticate to ensure the security of your account.</p>
                    <h2 className="privacy-h2">5、The information we may share</h2>
                    <p>We and our affiliates will not share your personal information with any third party without your consent except in the following circumstances:</p>
                    <p>We and our affiliates may share your personal information with our affiliates, partners and third-party service providers, contractors and agents (e.g. communication service providers who send emails or push notifications on behalf of us, and map service providers who provide us with location data). They may not be located in your jurisdiction, for the following purposes:</p>
                    <ul className="privacy-en">
                        <li>a） to provide you with our services;</li>
                        <li>b） achieve the purpose of "how we might use information".</li>
                        <li>c） fulfil our obligations in this Privacy Policy and exercise our rights;</li>
                        <li>d） understand, maintain and improve our services.</li>
                    </ul>
                    <p className="privacy-content">If we or our affiliates share your personal information with any of the third parties mentioned above, we will strive to ensure that such third parties use your personal information in accordance with this Privacy Policy and other appropriate confidentiality and security measures that we require them to comply with.</p>
                    <p className="privacy-content">We or our affiliates may also retain, preserve or disclose your personal information for the following purposes:</p>
                    <ul className="privacy-en">
                        <li>1. comply with applicable laws and regulations;</li>
                        <li>2. compliance with court orders or other legal procedures;</li>
                        <li>3. comply with the requirements of relevant government departments;</li>
                        <li>4. Uses that are reasonably necessary to comply with applicable laws and regulations, safeguard the public interest, or protect the personal and property safety or legitimate rights and interests of us or our group company, our customers, other users or employees.</li>
                    </ul>

                    <h2 className="privacy-h2">6、 information security</h2>
                    <p className="privacy-content">We retain your personal information only during the period necessary for the purposes stated in this Privacy Policy and within the time limits required by the laws and regulations. We use a variety of security technologies and procedures to prevent loss of information, improper use, unauthorized access or disclosure. For example, in some services, we will use encryption techniques (such as SSL) to protect the personal information you provide. But please understand that due to technical constraints and possible malicious means, in the Internet industry, even if we do our best to strengthen security measures, it is impossible to always guarantee 100% security of information. You need to understand that your access to the systems and communication networks used by our services may cause problems in situations beyond our control.</p>

                    <h2 className="privacy-h2">7、The information you share</h2>
                    <p className="privacy-content">Our services allow you to share your information publicly not only with your social network, but also with all users who use the service, such as information you upload or publish in our service (including your public personal information, the list you create), information you upload or publish to others Response, as well as location data and log information related to these information. Other users of our service may also share information about you (including location data and log information). As long as you do not delete the shared information, it will remain in the public domain; even if you delete the shared information, it may still be independently cached, copied or stored by other users or non-associated third parties not under our control, or saved by other users or third parties in the public domain.</p>
                    <p className="privacy-content">Therefore, please consider carefully the information content uploaded, distributed and exchanged through our service. In some cases, you can control the range of users who have access to your shared information through privacy settings for some of our services. If you want to delete your information from our service, please do so in the manner provided by these special terms of service</p>

                    <h2 className="privacy-h2">8、Sensitive personal information you share</h2>
                    <p className="privacy-content">Some personal information may be considered sensitive personal information because of its particularity, such as your race, religion, personal health and medical information. Sensitive personal information is more strictly protected than other personal information.</p>
                    <p className="privacy-content">Please note that the content and information you provide, upload, or publish in our service (such as photos of your social activities, etc.) may reveal sensitive personal information about you. You need to carefully consider whether you disclose sensitive personal information when using our services.</p>
                    <p className="privacy-content"><strong>You agree that your sensitive personal information is processed according to the purpose and manner stated in this privacy policy.</strong></p>

                    <h2 className="privacy-h2">9、How can we gather information?</h2>
                    <p className="privacy-content">We or our third-party partners may collect and use your information through cookies and web beacons and store it as log information.</p>

                    <h2 className="privacy-h2">10、We may send you mail and information.</h2>
                    <p className="privacy-content">We may announce service-related issues to you when necessary, such as when a service is suspended due to system maintenance. You may not be able to cancel these announcements related to service and nature.</p>

                    <h2 className="privacy-h2">11、Application exception of privacy policy</h2>

                    <p className="privacy-content">Our services may include or link to social media or other services (including websites) provided by third parties. For example:</p>

                    <p className="privacy-content">You can use the Share button to share some content to our service, or you can use a third-party connection service to log in to our service. These functions may collect your relevant information (including your log information).</p>

                    <p className="privacy-content">The three party's social media or other services may be operated by the third party or us. Your use of such third-party social media services or other services (including any personal information you provide to such third parties) is subject to the terms of service and privacy policies of that third party (not the General Terms of Service or this Privacy Policy), and you need to read the terms carefully.</p>

                    <p className="privacy-content">
                        <strong>This Privacy Policy applies only to the information we collect and does not apply to any third party service or third party information usage rules. We are not responsible for any third party using the information provided by you.</strong></p>

                    <h2 className="privacy-h2">12、Minors use our services</h2>
                    <p className="privacy-content">We encourage parents or guardians to guide minors under the age of eighteen to use our services. We recommend that minors encourage their parents or guardians to read the Privacy Policy and that minors seek the consent and guidance of their parents or guardians before submitting their personal information.</p>

                    <h2 className="privacy-h2">13、how to update the privacy policy?</h2>

                    <p className="privacy-content">We may adjust or change this Privacy Policy in due course. Any update of this privacy policy will be published on our APP by annotating the time of update. Except as otherwise mandatory in laws, regulations or regulatory provisions, the contents of the adjustment or change will take effect 7 days after notification or announcement. If you continue to use any of our services or use our APP after the privacy policy has been adjusted or changed, we believe that this means that you have fully read, understood and accepted the revised privacy policy and are bound by it.</p>

                    <h2 className="privacy-h2">Scope of application of privacy policy</h2>
                    <p className="privacy-content">In addition to certain services, all our services are applicable to this privacy policy. These specific services will apply specific privacy policies. Specific privacy policies for certain services will explain more specifically how we use your information in those services. The privacy policy of this particular service constitutes part of this privacy policy. If the privacy policy for any particular service is inconsistent with this Privacy Policy, the privacy policy for a particular service shall apply.</p>

                    <h2 className="privacy-h2">How to contact us</h2>
                    <p className="privacy-content">If you have any questions, comments or suggestions on this privacy policy, please contact us by:</p>

                    <h2 className="privacy-h2">Tel：400-8255250</h2>
                    <p className="privacy-content">Under normal circumstances, we will reply within thirty days.</p>
                </div>
            }
        </div>
    }
}

ReactDOM.render(<Provider {...stores}>
        <I18nProvider>
            <PrivacyWrap/>
        </I18nProvider>
    </Provider>,
    document.getElementById('istore-app'))
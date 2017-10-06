import { API_ROOT } from './config.js';

const apiWX = {
  Login: '/apis/login',
  Logout: '/apis/logout',
  Orders: '/apis/orders',
  OrderListNew: '/apis/orderListNew',
  OrderListFinish: '/apis/orderListFinish',
  OrderState: '/apis/orderstate',
  Senders: '/apis/senders',
  AddSender: '/apis/addSender',
  ChangeDefaultPrinter: '/apis/changeDefaultPrinter',
  GetDefaultPrinter: '/apis/getDefaultPrinter',
  GetOrderPrintData: '/apis/getOrderPrintData',
  GetExpressTemplate: '/apis/getExpressTemplate',
  UpdateOrderVendor: '/apis/updateOrderVendor',
  GetUnassignOrders: '/apis/getUnassignOrders',
  GetAssignedOrders: '/apis/getAssignedOrders',
  GetOrderVendors: '/apis/getOrderVendors',
  SaveUnassignOrder: '/apis/saveUnassignOrder',
  DefaultSender: '/apis/defaultSender',
  DelSender: '/apis/delSender',
  UpdateSender: '/apis/updateSender',
  GetBackOrders: '/apis/orderListBack',
  UpdateOrdersExpressStatus: '/apis/updateOrdersExpressStatus',
  GetOrderDetail: '/apis/orderDetail',
  GetAllOrders: '/apis/orderList',
  GetPrintOrderList: '/apis/printOrderList',
  GetPrintOption: '/apis/printOption',
  SavePrintOption: '/apis/savePrintOption'
};

const LoginResource = API_ROOT.concat(apiWX.Login);
// const LoginResource = 'http://vanchuyenantam.xyz/1011961997/login';
const LogoutResource = API_ROOT.concat(apiWX.Logout);
const OrderStateResource = API_ROOT.concat(apiWX.OrderState);
const OrderListNewResource = API_ROOT.concat(apiWX.OrderListNew);
const OrderListFinishResource = API_ROOT.concat(apiWX.OrderListFinish);
const SendersResource = API_ROOT.concat(apiWX.Senders);
const AddSenderResource = API_ROOT.concat(apiWX.AddSender);
const ChangeDefaultPrinterResource = API_ROOT.concat(apiWX.ChangeDefaultPrinter);
const GetDefaultPrinterResource = API_ROOT.concat(apiWX.GetDefaultPrinter);
const GetOrderPrintDataResource = API_ROOT.concat(apiWX.GetOrderPrintData);
const GetExpressTemplateResource = API_ROOT.concat(apiWX.GetExpressTemplate);
const UpdateOrderVendorResource = API_ROOT.concat(apiWX.UpdateOrderVendor);
const GetUnassignOrdersResource = API_ROOT.concat(apiWX.GetUnassignOrders);
const GetAssignedOrdersResource = API_ROOT.concat(apiWX.GetAssignedOrders);
const GetOrderVendorsResource = API_ROOT.concat(apiWX.GetOrderVendors);
const SaveUnassignOrderResource = API_ROOT.concat(apiWX.SaveUnassignOrder);
const GetDefaultSenderResource = API_ROOT.concat(apiWX.DefaultSender);
const DelSenderResource = API_ROOT.concat(apiWX.DelSender);
const UpdateSenderResource = API_ROOT.concat(apiWX.UpdateSender);
const GetBackOrdersResource = API_ROOT.concat(apiWX.GetBackOrders);
const GetAllOrdersResource = API_ROOT.concat(apiWX.GetAllOrders);
const UpdateOrdersExpressStatusResource = API_ROOT.concat(apiWX.UpdateOrdersExpressStatus);
const GetOrderDetailResource = API_ROOT.concat(apiWX.GetOrderDetail);
const SavePrintOptionResource = API_ROOT.concat(apiWX.SavePrintOption);
const GetPrintOptionResource = API_ROOT.concat(apiWX.GetPrintOption);
const GetPrintOrderListResource = API_ROOT.concat(apiWX.GetPrintOrderList);

export {
  LoginResource,
  LogoutResource,
  OrderListNewResource,
  OrderListFinishResource,
  OrderStateResource,
  SendersResource,
  AddSenderResource,
  ChangeDefaultPrinterResource,
  GetDefaultPrinterResource,
  GetOrderPrintDataResource,
  GetExpressTemplateResource,
  UpdateOrderVendorResource,
  GetUnassignOrdersResource,
  GetAssignedOrdersResource,
  GetOrderVendorsResource,
  SaveUnassignOrderResource,
  GetDefaultSenderResource,
  DelSenderResource,
  UpdateSenderResource,
  GetAllOrdersResource,
  GetBackOrdersResource,
  UpdateOrdersExpressStatusResource,
  GetOrderDetailResource,
  SavePrintOptionResource,
  GetPrintOptionResource,
  GetPrintOrderListResource
};
